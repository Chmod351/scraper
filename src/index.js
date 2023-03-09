const express = require("express");
const cors = require("cors");
require("dotenv").config();
const options = require("./swaggerConfig");
const app = express();
const scrape = require("./routes/scraper.js");
const ratelimit = require("express-rate-limit");
const morgan = require("morgan");
const port = process.env.PORT;

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const limit = ratelimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
});

//MIDDLEWARES
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limit);
app.use("/api", scrape);

//END MIDDLEWARES

const specs = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

//END SWAGGER

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
