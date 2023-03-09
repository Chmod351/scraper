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

const corsOptions = {
  origin: '*', // Permitir cualquier origen
  methods: 'POST', // Permitir todos los métodos HTTP
  preflightContinue: false,
  optionsSuccessStatus: 204
}

const limit = ratelimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
});

//MIDDLEWARES
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(cors(corsOptions));
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
