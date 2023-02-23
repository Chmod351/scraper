const scraper = require("cheerio")
const needle = require("needle")
const validUrl = require("valid-url")


const articles = [];
const arrayOfKeywords = []

module.exports = async function Scrapper(req, res) {
  const url = req.body.url;
  const objectClass = req.body.objectClass;
	checkInputContent(url,objectClass)
    if (!validUrl.isHttpsUri(url)) {
    res.send({ error: "invalid url",
  status:404 })
  } else {
    try {
      fetchingUrl(req, res, objectClass, url);

      res.status(200)
    } catch (error) {
      res.json({
        message: `${error}`
      });
    }
  }
}
function checkInputContent(url,objectClass){
	if(!url || !objectClass){
		res.status(404).json({"state":"error",
		"message":"missing information"})
	}
	return(url,objectClass)
}

function fetchingUrl(req, res, objectClass, url) {
  needle(url).then(response => {
    scrapingData(req, res, response, objectClass, url)

  })
}

async function scrapingData(req, res, response, objectClass, url) {
  const bodyHtml = response.body;
  const scraperLoad = scraper.load(bodyHtml);
  try {
    scraperLoad(objectClass, bodyHtml).each(function () {
      const title = scraperLoad(this).text();
      const link = scraperLoad(this).find('a').attr('href')
      articles.push({
        title,
        link
      })
    })
    scrapingWord(keyWord = await req.body.keyWord);
    res.status(200).json({
      "state": "succes",
      "objects found": arrayOfKeywords.length,
      "key-word": keyWord,
      "scanned webpage": url,
      "found articles": arrayOfKeywords
    })
    return (arrayOfKeywords);
  }
  catch (error) {
    console.error(error)
    res.json({
      message: `${error}`
    });
  }
}

function scrapingWord(keyWord) {
  for (let i = 0; i < articles.length; i++) {
    const wordsCompare = articles[i].title
    if (wordsCompare.includes(keyWord)) {
      arrayOfKeywords.push(wordsCompare)
    }
  }
  return (arrayOfKeywords);
};
