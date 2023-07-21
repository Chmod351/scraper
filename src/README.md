# Web Scrapper

This project is a highly versatile web scraper that allows users to extract data from any website by providing the URL link and CSS selector for scraping. With this tool, developers, analysts, and researchers can easily obtain specific information from different online sources for further analysis and processing. Powered by Node.js, the web scraper offers an efficient and flexible solution for fetching data from diverse web pages without limitations.

# Documentation

[Postman Documentation]()

## Custom use.

Select the Class container which contain the Link (<a> Element)
[video](video)
Then just choose what you want to search and put it in the keyword field, for example:
[video](video)
Press the button to get the results:
[results](video)

## Export.

The application provides an export option for users who need the information in other contexts. To use this feature, you must be registered in the application.

- Export Formats:
  - [PDF](link)
  - [CSV](Link)

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

The application was tested with Jest . Chai and Supertest

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
- Test your changes
- Document your changes
- Create your pull request with evidences
