const needle = require("needle");
const scraper = require("cheerio");
const validUrl = require("valid-url");

const articles = [];
const arrayOfKeywords = [];
const arrayOfNoKeywords = [];

module.exports = async function Scrapper(req, res, next) {
  const url = req.body.url;
  const objectClass = req.body.objectClass;

  checkInputContent(url, res, objectClass);
  if (!validUrl.isHttpsUri(url)) {
    res.status(400)
  } else {
    try {
      fetchingUrl(req, res, objectClass, url);
      res.status(200);
    } catch (error) {
      next(error);
    }
  }
};

function checkInputContent(url, res, objectClass) {
  if (!url || !objectClass) {
    res.status(400)
  }
  return url, objectClass;
}

function fetchingUrl(req, res, objectClass, url) {
  needle(url).then((response) => {
    scrapingData(req, res, response, objectClass, url);
  });
}

async function scrapingData(req, res, response, objectClass, url) {
  const bodyHtml = response.body;

  if (bodyHtml) {
    const scraperLoad = scraper.load(bodyHtml);
    try {
      scraperLoad(objectClass, bodyHtml).each(function () {
        const title = scraperLoad(this).text();

        const link = scraperLoad(this).find("a").attr("href");

        articles.push({
          title,
          link,
        });
      });

      scrapingWord((keyWord = await req.body.keyWord));

      res.status(200).json({
        state: "succes",
        "objects found": arrayOfKeywords.length,
        "key-word": keyWord,
        "scanned webpage": url,
        "found articles": arrayOfKeywords,
      });
      return arrayOfKeywords;
    } catch (error) {
      res.json(error);
    }
  } else {
    res.status(400).json("bad request");
  }
}

function noKeyword() {
  for (let i = 0; i < articles.length; i++) {
    const element = articles[i];
    arrayOfKeywords.push(element);
  }
}

function withKeyword(keyWord) {
  for (let i = 0; i < articles.length; i++) {
    const compareKeyword = articles[i];
    const convertToLowerCase = compareKeyword.title.toLowerCase();
    if (convertToLowerCase.includes(keyWord)) {
      arrayOfKeywords.push(compareKeyword);
    } else {
      arrayOfNoKeywords.push(articles[i]);
    }
  }
}

function scrapingWord(keyWord) {
  if (keyWord) {
    withKeyword(keyWord);
  } else {
    noKeyword();
  }
  return arrayOfKeywords;
}
