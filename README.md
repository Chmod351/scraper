![Screenshot_from_2023-08-02_14-38-24-removebg-preview](https://github.com/yamilt351/scraper/assets/88646148/ccf99b1d-f8b6-4cda-b5e6-4891b88add2b)

![Static Badge](https://img.shields.io/badge/Development-deployed) ![](https://img.shields.io/website-up-down-green-red/https/scraper-5ask.onrender.com/public/html.html.svg)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/yamilt351/scraper?color=green) ![GitHub issues](https://img.shields.io/github/issues/yamilt351/scraper?color=red) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/yamilt351/scraper) ![GitHub top language](https://img.shields.io/github/languages/top/yamilt351/scraper?color=blue) ![](https://img.shields.io/github/license/yamilt351/scraper.svg)

## Index

- [FAQ](https://github.com/yamilt351/scraper/blob/master/src/FAQ.md)
- [Demo](https://scraper-5ask.onrender.com/public/html.html)
- [UMLs](https://github.com/yamilt351/scraper/blob/master/UML.md)
- [Objetive](#Objetive)
- [Documentation](#Documentation)
  - [Custom Usage](#Custom-Usage)
  - [Body Example](#Body-Example)
  - [Response Example](#Response-Example)
- [Local Configuration](#Local-Configuration)
- [Usage Limitations](#Usage-Limitations)
- [Contributions](#Contributions)

# Objetive <a name="Objetive"></a>

The objective of this web scraper is to obtain information from any website, just by using its URL and the target CSS class that you want to scrape. It doesn't have a predefined purpose, so you can use it to gather information from any site you like.

# Documentation <a name="Documentation"></a>

[Postman Documentation](https://www.postman.com/orange-trinity-332576/workspace/scrapper/request/21643141-9324c29a-d14b-44c0-9a4d-2bf51d823d54?ctx=documentation)

# Custom Usage <a name="Custom-Usage"></a>

The code makes a `POST` request to the `/api/v1/scrappe` endpoint at `http://localhost:5000`. The request body should contain the following parameters:

- `keyWord` (string): The keyword to filter articles by (`optional`).
- `url` (string): The URL of the web page to scrape (`mandatory`).
- `objectClass` (string): The CSS class of the elements to scrape from the web page (`mandatory`).

The API endpoint responds with a JSON object containing the following properties:

- `state`: A string indicating the state of the scraping process.
- `objects found`: The number of objects found after filtering.
- `key-word`: The keyword used for filtering.
- `scanned webpage`: The URL of the webpage that was scraped.
- `found articles`: An array of articles that match the filtering criteria.  
  if the response is too big the api use [`compression`](https://www.npmjs.com/package/compression) middleware to reduce the size.
- implementing [`findOrCreate`](https://www.npmjs.com/package/mongoose-findorcreate) method for mongoose is a powerful tool to ensure that the scraping of websites doesn't lead to duplicated results in the database.

## Body Example <a name="Body-Example"></a>

```javascript
{
      "url":"https://www.url.com.ar",
      "objectClass":".css-class-selector",
      "keyWord":"keyword"
}
```

## Response Example <a name="Response-Example"></a>

```javascript

{
    "state": "success",
    "objects found": 2,
    "key-word": {
        "doc": {
            "_id": "64d40fa677d90019c57302ed",
            "keyword": "keyword",
            "createdAt": "2023-08-09T22:13:58.108Z",
            "updatedAt": "2023-08-10T17:08:08.459Z",
            "__v": 0,
            "usedTimes": 28
        },
        "created": false
    },
    "scanned webpage": {
        "_id": "64d3e3459686e7f4087acfdb",
        "cssClass": ".css-class-selector",
        "url": "https://www.url.com.ar",
        "__v": 0,
        "createdAt": "2023-08-09T19:04:37.137Z",
        "scrapedTimes": 69,
        "updatedAt": "2023-08-10T17:08:08.328Z"
    },
    "found articles": [
        {
            "_id": "64d4fcf821aef9f1dd17bbb8",
            "websiteTarget": "64d3e3459686e7f4087acfdb",
            "keywords": [
                "64d40fa677d90019c57302ed"
            ],
            "title": "Some Title",
            "link": "/some/link/related/to/the/article",
            "createdAt": "2023-08-10T15:06:32.535Z",
            "updatedAt": "2023-08-10T17:08:08.643Z",
            "__v": 2
        },
     ]
}

```

## Local Configuration <a name="Local-Configuration"></a>

[Nodejs](https://nodejs.org/en) v20 (check your node version with `node -v`)

create your .env file with these values:

```
PORT=5000
URL_SERVER=https://url.com
LIMIT=2000
MONGOOSE_USER=mongodb+srv://{USER}:{PASSWORD}@cluster0.4g3ly.mongodb.net/?retryWrites=true&w=majority

```

install dependencies with `npm i`

The application was tested with [Jest](https://jestjs.io/docs/getting-started), [Chai](https://www.chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest)

- to run integration test:
  `npm run test:integration`
- to run unit tests:
  `npm run test:unit`
- to run the whole test:
  `npm run test`

# Usage Limitations <a name="Usage-Limitations"></a>

- You can only send up to 100 requests per 10 minutes.
- If the webpage has incorrect element nesting, the scraper will fail
- before use this tool please read [FAQ](https://github.com/yamilt351/scraper/blob/master/src/FAQ.md)
# Contributors
Especial thanks to:
- @Robertw8
# Contributions <a name="Contributions"></a>

- Fork this Repo
- Make your changes
- Test your changes `npm run test`
- Document your changes
- Create your pull request with evidences at Development.
- Code Styles are provided by [eslint](https://github.com/neoclide/coc-eslint) & [prettier](https://github.com/neoclide/coc-prettier)
- Yours Pull Requests should follow the next structure (the repo has a boilerplate to do that):
  - As (`Developer`)
  - I want to (`Your changes`)
  - To (`Feature`)
  - Happy path (`succesfull case screenshoot`)
  - Unhappy path (`unsuccesfull case screenshots , more than 1`)
