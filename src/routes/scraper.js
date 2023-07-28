import express from 'express';
const router = express.Router();
// import apiCache from 'apicache';
import scrapper from '../Controlers/scraper.js';
// let cache = apiCache.middleware;

/**
 * @swagger
 *  /api/scrappe:
 *   post:
 *     summary: Extraer datos de un sitio web.
 *     description: Use this Api to scrape data from any site, first read our documentation before use it https://github.com/yamilt351/scraper!
 *     requestBody:
 *       description: Required data.
 *       fromd: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScraperRequest'
 *     responses:
 *       200:
 *         description: Succesfull response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Dato found.
 *       400:
 *         description: Bad request.
 */
router.post('/scrappe', scrapper.scrapperController);
// router.get('/scrape', cache('2 minutes'), scrapper);
// router.get('/scrape/links', scrapper);

// router.get('/scrape/stats/pages', scrapper);
// router.get('/scrape/stats/words', scrapper);
// router.get('/scrape/stats/links', scrapper);

export default router;
