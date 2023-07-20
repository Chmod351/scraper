import scrappService from '../services/scrapper.js';
import validUrl from 'valid-url';

function scrap(req, res, next) {
  scrappService
    .checkInputContent(req.body.url, req.body.objectClass)
    .then(() => validUrl.isHttpsUri(req.body.url))
    .then(() => scrappService.scrap(req, res, next))
    .then((response) => res.json(response))
    .catch((error) => next(error));
}

const scrapper = {
  scrap,
};
export default scrapper;
