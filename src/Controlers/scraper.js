import scrappService from '../services/scrapper.js';
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

const scrapper = {
  scrapperController,
};
export default scrapper;
