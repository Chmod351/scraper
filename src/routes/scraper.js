const express = require("express")
const router = express.Router()
const apiCache = require('apicache')
const  Scrapper= require ("../Controlers/scraper.js")
let cache = apiCache.middleware


router.post("/scraper", cache('2 minutes'),Scrapper)


module.exports = router
