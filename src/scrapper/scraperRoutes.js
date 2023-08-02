import express from 'express';
const router = express.Router();
// import apiCache from 'apicache';
import scrapper from '../scrapper/scrapperControllers.js';
// let cache = apiCache.middleware;

 /**
 * @swagger
 *  /api/scrappe:
 *   post:
 *     summary: Extraer datos de un sitio web.
 *     description: Use this API to scrape data from any site. First, read our documentation before using it: [Documentation](https://github.com/yamilt351/scraper)!
 *     requestBody:
 *       description: Required data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScraperRequest'
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Data found.
 *       400:
 *         description: Bad request.
 */

router.post('/scrappe', scrapper.scrapperController);
router.get('/scrappe', scrapper.getData);
export default router;
