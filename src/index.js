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
const specs = swaggerJsdoc(options);

const corsOptions = {
  origin: [
    "https://scraper-5ask.onrender.com/api/docs/#/default/post_api_scrape",
    "https://scraper-5ask.onrender.com",
    "https://scraper-5ask.onrender.com/api/docs",
  ],
  allowedHeaders: "Content-Type",
};

const limit = ratelimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
});

//MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(limit);
//END MIDDLEWARES

app.use("/api", scrape);
app.use(
  "/api/docs",
  cors(corsOptions),
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

