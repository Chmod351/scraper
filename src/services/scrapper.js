import needle from 'needle';
import cheerio from 'cheerio';
import { BadRequestError } from '../helpers/errorHandler.js';


async function fetchUrl(url) {
  try {
    const response = await needle(url);
    return response.body;
  } catch (error) {
    return error.message;
  }
}

function checkInputContent(url, objectClass) {
  if (!url || !objectClass) {
    throw new BadRequestError('bad request');
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

function noKeyword() {
  return function () {
    return true;
  };
}

function withKeyword(keyWord) {
  return function (article) {
    const convertToLowerCase = article.title.toLowerCase();
    return convertToLowerCase.includes(keyWord);
  };
}

function cleanArticles(articles) {
  return articles.map((article) => {
    article.title = removeSpecialChars(article.title);
    return article;
  });
}

const scrappAction = async function Scrapper(req, res) {
  const keyword = req.body.keyWord;
  const url = req.body.url;
  const objectClass = req.body.objectClass;
  // obtiene el body de la pagina
  const bodyHtml = await fetchUrl(url);
  // identifica a los articulos que contienen la lase
  const articles = scrapeData(bodyHtml, objectClass);
  // limpia el texto contenido en los articulos para facilitar la lectura
  const cleanedArticles = cleanArticles(articles);
  // valida si hay palabra clave o no
  const filterFn = keyword ? withKeyword(keyword) : noKeyword();
  // busca a los articulos por palabra clave si la hay sino llama a todos
  const filteredArticles = filterArticles(cleanedArticles, filterFn);

  res.json({
    state: 'succes',
    'objects found': filteredArticles.length,
    'key-word': keyword,
    'scanned webpage': url,
    'found articles': filteredArticles,
  });
};

const scrappService = {
  scrappAction,
  checkInputContent,
  fetchUrl,
  scrapeData,
  removeSpecialChars,
  filterArticles,
  noKeyword,
  withKeyword,
  cleanArticles,
};

export default scrappService;
