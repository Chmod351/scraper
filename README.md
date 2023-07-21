# Web Scrapper

This project is a highly versatile web scraper that allows users to extract data from any website by providing the URL link and CSS selector for scraping. With this tool, developers, analysts, and researchers can easily obtain specific information from different online sources for further analysis and processing. Powered by Node.js, the web scraper offers an efficient and flexible solution for fetching data from diverse web pages without limitations.

# Documentation

[Postman Documentation](https://www.postman.com/orange-trinity-332576/workspace/scrapper/request/21643141-9324c29a-d14b-44c0-9a4d-2bf51d823d54?ctx=documentation)

## Custom use.

Select the Class container which contain the Link (<a> Element)
[Screencast from 2023-07-21 09-24-17.webm](https://github.com/yamilt351/scraper/assets/88646148/12168afa-3df0-4aa5-a473-57bf826754cb)

Then just choose what you want to search and put it in the keyword field, for example:


[Screencast from 2023-07-21 13-54-55.webm](https://github.com/yamilt351/scraper/assets/88646148/bcbba111-4fde-4cfc-b8bc-ef601d07645a)


Press the button to get the results:

[Screencast from 2023-07-21 13-55-44.webm](https://github.com/yamilt351/scraper/assets/88646148/f417499c-60aa-4df0-85b0-224f27e440b0)


## Local Configuration.

Nodejs =< v16 (check your node version with `node -v`)
create your .env file with this values:

```
PORT=5000
URL_DOCS=https://yourUrlHere/api/docs
URL_SERVER=https://hostingServer.com
URL_SCRAPPER=https://your-site-here.com
LIMIT=2000
```

install dependencies with `npm i`

The application was tested with [Jest](https://jestjs.io/docs/getting-started) . [Chai](https://www.chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest)

- to run integration test:
  `npm run test:integration`
- to run unit tests:
  `npm run test:unit`
- to run the whole test:
  `npm run test`

# Api

if you want just [use our Public Api](https://scraper-5ask.onrender.com/api/scrappe) you have to send a `POST` request to this endpoint with :

```
{
      "url":"https://www.url.com.ar",
      "objectClass":".css-class-selector",
      "keyWord":"keyword"
}
```

for more [information click here](#Documentation)

The keyword parameter is optional, but it is considered a best practice to include it. Without specifying a keyword, the web scraper may retrieve a large amount of data from the target site, potentially overloading it and leading to IP blocking. By providing a keyword, you can narrow down the data to only what is relevant, reducing the API's load and improving its performance, resulting in faster response times

if the response is too big the api use `compression` middleware to reduce the size.

## Usage Limitations:

You can only send up to 15 requests per 10 minutes.

# Contributions

- Clone Repo

`git clone https://github.com/yamilt351/scrape`

- Make your changes
- Test your changes `npm run test`
- Document your changes
- Create your pull request with evidences
