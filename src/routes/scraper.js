const express = require("express")
const router = express.Router()
const apiCache = require('apicache')
const  Scrapper= require ("../Controlers/scraper.js")
let cache = apiCache.middleware

/**
 * /
 * @swagger
 *   components:
 *     schemas:
 *     scraper:
 *      type: object
 *      requires:
 *        -url
 *        -objectClass
 *        -keyWord
 *     properties:
 *        url:
 *         type: string
 *        objectClass:
 *         type: string
 *        keyWord:
 *         type: string
 */

/**
 * @swagger
 *  /api/scraper:
 *  post:
 *    summary: create a request to scrap any website
 *    tags: [Create a new request]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#components/schemas/scraper'
 *    responses:
 *     200:
 *      description: web scanned!
 */

router.post("/scraper", cache('2 minutes'),Scrapper)


module.exports = router