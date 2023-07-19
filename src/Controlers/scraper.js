import needle from 'needle';
import cheerio from 'cheerio';
import validUrl from 'valid-url';

function checkInputContent(url, objectClass) {
  if (!url || !objectClass) {
    throw new Error('Invalid input');
  }
}

async function fetchUrl(url) {
  const response = await needle(url);
  return response.body;
}

function scrapeData(bodyHtml, objectClass) {
  const articles = [];
  const scrapeLoad = cheerio.load(bodyHtml);
  scrapeLoad(objectClass, bodyHtml).each(function () {
    const title = scrapeLoad(this).text();
    const link = scrapeLoad(this).find('a').attr('href');
    articles.push({
      title,
      link,
    });
  });
  return articles;
}

function removeSpecialChars(str) {
  const regex = /[\n\t]+/g;
  return str.replace(regex, '');
}

function filterArticles(articles, filterFn) {
  return articles.filter(filterFn);
}

function withKeyword(keyWord) {
  return function (article) {
    const convertToLowerCase = article.title.toLowerCase();
    return convertToLowerCase.includes(keyWord);
  };
}

function noKeyword() {
  return function () {
    return true;
  };
}

const scrap = async function Scrapper(req, res) {
  const url = req.body.url;
  const objectClass = req.body.objectClass;
  const keyWord = req.body.keyWord;

  checkInputContent(url, objectClass);

  if (!validUrl.isHttpsUri(url)) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }

  try {
    const bodyHtml = await fetchUrl(url);
    const articles = scrapeData(bodyHtml, objectClass);
    const cleanedArticles = articles.map((article) => {
      article.title = removeSpecialChars(article.title);
      return article;
    });
    const filterFn = keyWord ? withKeyword(keyWord) : noKeyword();
    const filteredArticles = filterArticles(cleanedArticles, filterFn);

    res.status(200).json({
      state: 'succes',
      'objects found': filteredArticles.length,
      'key-word': keyWord,
      'scanned webpage': url,
      'found articles': filteredArticles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default scrap;
