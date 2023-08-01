# Documentation

[Postman Documentation](https://www.postman.com/orange-trinity-332576/workspace/scrapper/request/21643141-9324c29a-d14b-44c0-9a4d-2bf51d823d54?ctx=documentation)

## Flow Chart

![image](https://github.com/yamilt351/scraper/assets/88646148/1a2e8fba-5c3b-4fc6-8c26-aa531f42853c)

## Custom use.
The code makes a `POST` request to the `/api/scrappe` endpoint at `http://localhost:5000`. The request body should contain the following parameters:

`keyWord` (string): The keyword to filter articles by (optional).
`url` (string): The URL of the web page to scrape (mandatory).
`objectClass` (string): The CSS class of the elements to scrape from the web page (mandatory).

The API endpoint responds with a JSON object containing the following properties:
`state`: A string indicating the state of the scraping process.
`objects found`: The number of objects found after filtering.
`key-word`: The keyword used for filtering.
`scanned webpage`: The URL of the webpage that was scraped.
`found articles`: An array of articles that match the filtering criteria.  
if the response is too big the api use [`compression`](https://www.npmjs.com/package/compression) middleware to reduce the size.

## Body Example:
```
{
      "url":"https://www.url.com.ar",
      "objectClass":".css-class-selector",
      "keyWord":"keyword"
}
```
## Response Example: 

```
{
    "state": "succes",
    "objects found": 112,
    "key-word": "",
    "scanned webpage": "https://www.url.com/",
    "found articles": [
        {
            "title": "this a title",
            "link": "/subject/url-parameters-to-find-the-article-that-you-get-with-the-scrapper/"
        },
        {
            "title": " title",
            "link": "/subjects/another-url-related-to-yours-results/"
        },
    ]
}
```

## Local Configuration.

Nodejs =< v16 (check your node version with `node -v`)
create your .env file with this values:

```
PORT=5000
URL_DOCS=https://url.com/api/docs
URL_SERVER=https://url.com
URL_SCRAPPER=https://url.com/api
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


## Usage Limitations:

- You can only send up to 15 requests per 10 minutes.
- If the webpage has incorrect element nesting, the scraper will fail
- before use this tool please read [FAQ](https://github.com/yamilt351/scraper/blob/master/src/FAQ.md)

# Contributions

- Clone Repo

`git clone https://github.com/yamilt351/scrape`

- Make your changes
- Test your changes `npm run test`
- Document your changes
- Create your pull request with evidences
- Code Styles are provided by [eslint](https://github.com/neoclide/coc-eslint) & [prettier](https://github.com/neoclide/coc-prettier)
- Yours Pull Requests should follow the next structure (the repo has a boilerplate to do that):
  - As (`Developer`)
  - I want to (`Your changes`)
  - To (`Feature`)
  - Happy path (`succesfull case screenshoot`)
  - Unhappy path (`unsuccesfull case screenshots , more than 1`)
