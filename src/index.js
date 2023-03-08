const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const scraper = require("./routes/scraper.js");
const ratelimit = require("express-rate-limit");
const morgan = require("morgan");
const port = process.env.PORT;
const Error = require("http-errors");

const limit = ratelimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
});

const errorMidleware = (err, req, res, next) => {
  res?.status(err.status || 500);

  res?.send({
    error: {
      status: err.status || 500,

      message: err.message,
    },
  });
};

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limit);
app.use("/api", scraper);
app.use(async (req, res, next) => {
  next(Error.NotFound());
});

app.use(errorMidleware);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
