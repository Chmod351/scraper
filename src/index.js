const express= require("express")
const { Sequelize } = require('sequelize')
const cors = require('cors')
require("dotenv").config()
const app = express();
const scraper= require("./routes/scraper.js")
const ratelimit = require("express-rate-limit")
const port = process.env.PORT ;
app.use(cors());

swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

app.use(express.urlencoded({ extended: false }));

const limit = ratelimit({
  windowMs: 10 * 60 * 1000,
  max: 5
})
app.use(limit)
app.use("/api/",scraper)

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ultra Scraper",
      version: "0.1.0",
      description: "get information about any website in seconds",
      license: {
        name: "yamil tauil",
        url: "https://github.com/yamilt351",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: [
    "./routes/scraper.js",
  ],
};
const specs = swaggerJsdoc(options);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
