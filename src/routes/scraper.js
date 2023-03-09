const express = require("express");
const router = express.Router();
const apiCache = require("apicache");
const Scrapper = require("../Controlers/scraper.js");
let cache = apiCache.middleware;

/**
 * @swagger
 *  /api/scrape:
 *   post:
 *     summary: Extraer datos de un sitio web.
 *     description: Use esta API para extraer datos de un sitio web.
 *     requestBody:
 *       description: Datos necesarios para realizar la extracción.
 *       required: true
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
router.post("/scrape", cache("2 minutes"), Scrapper);

module.exports = router;
