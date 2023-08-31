import scrappService from './scrapperService.js';
import validUrl from 'valid-url';

async function scrapperController(req, res, next) {
  try {
    scrappService.checkInputContent(req.body.url, req.body.objectClass);
    validUrl.isHttpsUri(req.body.url);
    const response = await scrappService.saveScrapedDataToDatabase(
      req,
      res,
      next,
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
}

const scrapper = {
  scrapperController,
};
export default scrapper;
