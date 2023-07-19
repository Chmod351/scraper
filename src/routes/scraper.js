import express from 'express';
const router = express.Router();
import apiCache from 'apicache';
import scrapper from '../Controlers/scraper.js';

let cache = apiCache.middleware;

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

router.post('/scrape', cache('30 minutes'), scrapper);

export default router;
