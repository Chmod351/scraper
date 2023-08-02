import scrappService from '../scrapper/scrapperService.js';
import validUrl from 'valid-url';

async function scrapperController(req, res, next) {
  try {
    scrappService.checkInputContent(req.body.url, req.body.objectClass);
    validUrl.isHttpsUri(req.body.url);
    const response = await scrappService.scrappAction(req, res, next);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getData(req, res, next) {
  try {
    const response = await scrappService.getRelated(req.body.keyWord);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

const scrapper = {
  scrapperController,
  getData,
};
export default scrapper;
