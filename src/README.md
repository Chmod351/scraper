# Web Scrapper

This project is a highly versatile web scraper that allows users to extract data from any website by providing the URL link and CSS selector for scraping. With this tool, developers, analysts, and researchers can easily obtain specific information from different online sources for further analysis and processing. Powered by Node.js, the web scraper offers an efficient and flexible solution for fetching data from diverse web pages without limitations.

## Use.

you can [go to swagger](https://scraper-5ask.onrender.com/api/docs) and watch the online demo with an out the box example.

you can [go to demo live site](https://scraper-5ask.onrender.com/public/html.html) and try it with an out the box example

## Response Example.

`
{
"state": "succes",
"objects found": 112,
"key-word": "",
"scanned webpage": "https://www.targetSite.com.ar",
"found articles": [
{
"title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod sapien at lectus efficitur facilisis.",
"link": "/economia/exigen-un-nuevo-anticipo-de-ganancias-a-empresas-nid21072023/"
},
{
"title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod sapien at lectus efficitur facilisis.",
"link": "/economia/la-reaccion-de-hernan-lacunza-al-nuevo-anticipo-de-ganancias-a-empresas-que-anuncio-la-afip-nid21072023/"
},
{
"title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod sapien at lectus efficitur facilisis.",
"link": "/espectaculos/murio-a-los-96-anos-tony-bennett-el-iconico-cantante-con-siete-decadas-de-carrera-nid21072023/"
},
{
"title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod sapien at lectus efficitur facilisis.",
"link": "/economia/campo/mas-perjuicios-que-beneficios-fuerte-rechazo-de-la-produccion-y-la-exportacion-a-un-nuevo-dolar-para-nid20072023/"
}]
}

`

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
```

install dependencies with `npm i`

Click this [link to use our Public Api](https://scraper-5ask.onrender.com/api/scrappe)
