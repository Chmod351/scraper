import needle from 'needle';
import cheerio from 'cheerio';
import { BadRequestError } from '../helpers/errorHandler.js';
import WebsiteTarget from './scrapperModel/scrapperTargetModel.js';
import Result from './scrapperModel/scrapperResults.js';
import Keyword from './scrapperModel/scrapperKeyword.js';

const scrapperLoader = cheerio.load;
const urlAnalyzer = needle;

async function fetchUrl(url) {
  try {
    const response = await urlAnalyzer(url);
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
  const scrapeLoad = scrapperLoader(bodyHtml);
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
  return str.replace(regex, '  ');
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

async function callingFunctions(url, cssClass, keyword) {
  // get body
  const bodyHtml = await fetchUrl(url);
  // id articles
  const articles = scrapeData(bodyHtml, cssClass);
  // clean texts
  const cleanedArticles = cleanArticles(articles);
  const filterFn = keyword ? withKeyword(keyword) : noKeyword();
  // search by keyword or
  const filteredArticles = filterArticles(cleanedArticles, filterFn);
  return filteredArticles;
}

async function getOrCreateKeyword(keyword) {
  if (!keyword) {
    return null;
  }

  try {
    const [resultKeyword, created] = await Keyword.findOrCreate({
      where: { keyword },
      defaults: { usedTimes: 1 },
    });
    return resultKeyword;
  } catch (error) {
    throw error;
  }
}

async function saveScrapedDataToDatabase(req, res) {
  const url = req.body.url;
  const cssClass = req.body.objectClass;
  const keyword = req.body.keyWord;

  try {
    const arrayResultsScrapped = await callingFunctions(url, cssClass, keyword);
    const [websiteTarget, created] = await WebsiteTarget.findOrCreate({
      where: { url, cssClass },
      defaults: { scrapedTimes: 1 },
    });

    if (!created) {
      websiteTarget.increment('scrapedTimes');
    }

    const resultKeyword = await getOrCreateKeyword(keyword);

    for (const article of arrayResultsScrapped) {
      const result = await Result.create({
        title: article.title,
        link: article.link,
      });

      await result.setWebsiteTarget(websiteTarget);

      if (resultKeyword) {
        await result.addResultKeyword(resultKeyword);
      }
    }
    const data = {
      length: arrayResultsScrapped.length,
      keyword: keyword,
      url: url,
      articles: arrayResultsScrapped,
    };

    return data;
  } catch (error) {
    throw error;
  }
}

const scrappActionResponse = async function Scrapper(req, res) {
  const data = await saveScrapedDataToDatabase(req, res);
  console.log(data + '  data');
  res.json({
    state: 'success',
    'objects found': data.length,
    'key-word': data.keyword,
    'scanned webpage': data.url,
    'found articles': data.articles,
  });
};

const scrappService = {
  scrappActionResponse,
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
