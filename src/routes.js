import express from 'express';
const router = express.Router();
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import options from './config/swaggerConfig.js';
import scrapper from './scrapper/scrapperControllers.js';

const specs = swaggerJsdoc(options);
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
router.get('/docs', swaggerUi.serve, swaggerUi.setup(specs));
router.post('/scrappe', scrapper.scrapperController);
export default router;
