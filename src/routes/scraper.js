const express = require("express");
const router = express.Router();
const apiCache = require("apicache");
const Scrapper = require("../Controlers/scraper.js");
let cache = apiCache.middleware;

/**
* /
* @swagger
* components:
*  schemas:
*    scraper:
*      type: object
*      requires:
*        -url
*        -objectClass
*      properties:
*        url:
*          type: string
*        objectClass:
*          type: string
*          description: .example
*        keyWord:
*          type: string
*          description: banana
*/
/**
 /
 * @swagger
* /api/scraper/:
*  get:
*    summary: Scrap especific data
*    tags: [scrap data]
*    parameters:
*       - name: url 
*         in: path
*         description: TARGET
*         required: true
*         schema:
*           type: string 
*       - name: objectClass
*         in: path
*         description: SELECTOR TARGET
*         required: true
*         schema:
*           type: string 
*       - name: keyWord
*         in: path
*         description: get specifics results
*         required: false
*         schema:
*           type: string 
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/scraper'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/scraper'
*        '400':
*          description: bad request
*/
router.post("/scraper", cache("2 minutes"), Scrapper);

module.exports = router;
