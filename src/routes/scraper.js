import express from 'express';
const router = express.Router();
// import apiCache from 'apicache';
import scrapper from '../Controlers/scraper.js';
// let cache = apiCache.middleware;

/**
 * @swagger
 *  /api/scrape:
 *   post:
 *     summary: Extraer datos de un sitio web.
 *     description: Use esta API para extraer datos de un sitio web.
 *     requestBody:
 *       description: Datos necesarios para realizar la extracción.
 *       fromd: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScraperRequest'
 *     responses:
 *       200:
 *         description: Datos extraídos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Datos extraídos del sitio web.
 *       400:
 *         description: Error de solicitud.
 */
router.post('/scrape', scrapper.scrapperController);
// router.get('/scrape', cache('2 minutes'), scrapper);
// router.get('/scrape/links', scrapper);

// router.get('/scrape/stats/pages', scrapper);
// router.get('/scrape/stats/words', scrapper);
// router.get('/scrape/stats/links', scrapper);

export default router;
