const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const scraper = require("./routes/scraper.js");
const ratelimit = require("express-rate-limit");
const morgan = require("morgan");
const port = process.env.PORT;

(swaggerJsdoc = require("swagger-jsdoc")),
  (swaggerUi = require("swagger-ui-express"));

const limit = ratelimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
});



//MIDDLEWARES
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limit);
app.use("/api", scraper);

//END MIDDLEWARES

//START SWAGGER

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "web scraper",
      version: "0.1.0",
      description: "scraper",
      license: {
        name: "GPL",
        url: "https://github.com/yamilt351/scraper",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}/`,
      },
    ],
  },
  apis: ["./Controlers/scraper.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
//END SWAGGER

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
