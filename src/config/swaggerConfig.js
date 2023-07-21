const SERVER = process.env.SERVER;
const port = process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Web Scraper',
      version: '1.0.0',
      description:
        'Suppose you want some information from a website? Let’s say a paragraph on Donald Trump! What do you do? Well, you can copy and paste the information from Wikipedia to your own file. But what if you want to get large amounts of information from a website as quickly as possible? Such as large amounts of data from a website to train a Machine Learning algorithm? In such a situation, copying and pasting will not work! And that’s when you’ll need to use Web Scraping. You can watch more about the project here https://github.com/yamilt351/scraper',
      license: {
        name: 'GPL',
        url: 'https://github.com/yamilt351/scrape',
      },
    },
    servers: [
      {
        url: `${SERVER}:${port}`,
        description: 'Deployment server',
      },
    ],
    components: {
      schemas: {
        ScraperRequest: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL del sitio web a escrapear',
              example: 'https://libreddit.de/r/linux',
            },
            objectClass: {
              type: 'string',
              description: 'Clase CSS del objeto a extraer',
              example: '.post_title',
            },
            keyword: {
              type: 'string',
              description: 'Palabra clave para buscar en los datos extraídos',
              example: 'linux',
            },
          },
          required: ['url', 'objectClass'],
        },
      },
    },
  },
  apis: ['./routes/scraper.js'],
};

export default options;
