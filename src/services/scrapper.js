import needle from 'needle';
import cheerio from 'cheerio';
import { BadRequestError } from '../helpers/errorHandler';

async function fetchUrl(url) {
  try {
    const response = await needle(url);
    return response.body;
  } catch (error) {
    return error;
  }
}

function checkInputContent(url, objectClass) {
  if (!url || !objectClass) {
    throw new BadRequestError('no inputs found');
  }
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

function Articles(articles) {
  articles.map((article) => {
    article.title = removeSpecialChars(article.title);
    return article;
  });
}

const scrap = async function Scrapper(req, res) {
  const keyWord = req.body.keyWord;
  const objectClass = req.body.objectClass;

  const bodyHtml = await fetchUrl(url);
  const articles = scrapeData(bodyHtml, objectClass);

  const cleanedArticles = Articles(articles);

  const filterFn = keyWord ? withKeyword(keyWord) : noKeyword();
  const filteredArticles = filterArticles(cleanedArticles, filterFn);

  res.status(200).json({
    state: 'succes',
    'objects found': filteredArticles.length,
    'key-word': keyWord,
    'scanned webpage': url,
    'found articles': filteredArticles,
  });
};

const scrappService = {
  scrap,
  checkInputContent,
};

export default scrappService;
