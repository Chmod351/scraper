import scrappService from '../services/scrapper.js';

function scrap(req, res, next) {
  scrappService
    .scrap(req, res, next)
    .then((response) => res.json(response))
    .catch((error) => next(error));
}

export default scrap;
