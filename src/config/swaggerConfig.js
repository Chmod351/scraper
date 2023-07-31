import envConfig from './envConfig.js';
const SERVER = envConfig.host;
const PORT = envConfig.port;

const demo = `${SERVER}/public/html.html`
const documentation = 'https://github.com/yamilt351/scraper';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Web Scraper Documentation',
      version: '1.0.0',
      description: `The project is a web scraper designed to extract specific information from websites. To use it, the user must provide the URL of the website they want to scraper. Using this web scraper requires some familiarity with inspecting elements in a web browser and a basic understanding of CSS classes. Please make sure to carefully follow the steps mentioned above to achieve the desired results. This web scraper is designed to simplify the process of extracting information from websites in a straightforward manner. However, it's essential to remember that its use should be responsible and respectful of the website's terms of service. Always obtain appropriate permission before scraping any website and avoid making excessive requests that could overload or negatively impact the target website. watch the demo ${demo} or just read or documentation ${documentation}`,
      license: {
        name: 'Licence',
        url: 'https://github.com/yamilt351/scraper/blob/master/src/License.md',
      },
      url: 'https://github.com/yamilt351/scraper',
    },
    servers: [
      {
        url: `${SERVER}:${PORT}`,
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
              description:
                "Once you has provided the URL, you should use your web browser's developer console to inspect the element that contains the information you want to scrape. This is an important part of the process and requires a basic understanding of how to inspect elements in a web browser. The container element is the HTML tag that surrounds or encapsulates the content that you wants to extract from the website. It could be a div tag, a paragraph (p) tag, a list (ul/li) tag, or any other HTML tag that holds the relevant information.",
              example: 'https://libreddit.de/r/linux',
            },
            objectClass: {
              type: 'string',
              description:
                "After identifying the container element, you must select the CSS class that identifies it. The CSS class is an identifier used in the website's HTML code to apply styles and format the content. The web scraper will use this CSS class provided by the user to locate and extract the specific information found within the container element.",
              example: '.post_title',
            },
            keyword: {
              type: 'string',
              description:
                'If you wants to refine the results obtained from the web scraper, you can use a keyword to filter them. The web scraper will search for this keyword in all container elements and display only those that contain the specified keyword',
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
