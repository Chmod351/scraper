import scrappService from '../scrapper/scrapperService.js';
import { expect } from 'chai';

describe('Normal Cases: Unit Tests', () => {
  it('fetchUrl should fetch the url and return status code 200 ', async () => {
    const testScrap = 'https://www.lanacion.com.ar/';
    const response = await scrappService.fetchUrl(testScrap);
    expect(response).contain('</html');
  });

  it('checkInputContent  should not return any error if objectClass and url exists', () => {
    const testScrap = {
      url: 'www.example.com',
      objectClass: '.class',
    };
    const response = scrappService.checkInputContent(
      testScrap.url,
      testScrap.objectClass,
    );
    expect(response).to.be.equal(undefined);
  });
  it('scrapeData should  return an array with articles when given an valid html', () => {
    const bodyHtml = `
      <div class="article">
        <h2>Title 1</h2>
        <a href="https://example.com/article1">Read more</a>
      </div>
      <div class="article">
        <p>text description</p>
        <a href="https://example.com/article2">Read more</a>
      </div>
      <div class="article">
     <div>
        <h2>Title 2</h2>
        <p>text description</p>
     </div>
        <a href="https://example.com/article2">Read more</a>
      </div>
    `;
    const objectClass = '.article';

    function normalizeTitle(title) {
      return title.replace(/\s+/g, ' ').trim();
    }

    const result = scrappService.scrapeData(bodyHtml, objectClass);

    const normalizedResult = result.map((article) => ({
      ...article,
      title: normalizeTitle(article.title),
    }));

    expect(normalizedResult).to.deep.equal([
      { title: 'Title 1 Read more', link: 'https://example.com/article1' },
      {
        title: 'text description Read more',
        link: 'https://example.com/article2',
      },
      {
        title: 'Title 2 text description Read more',
        link: 'https://example.com/article2',
      },
    ]);
  });
  it('removeSpecialChars should remove specials chars in the string', () => {
    const input = 'Hello\n\tWorld!';
    const expectedOutput = 'Hello  World!';
    const result = scrappService.removeSpecialChars(input);
    expect(result).to.be.equal(expectedOutput);
  });
  it('filterArticles  should return the result with the keyword ', () => {
    const articles = [
      { title: 'Article 1', link: 'https://example.com/article1' },
      { title: 'Article 2', link: 'https://example.com/article2' },
      { title: 'Article 3', link: 'https://example.com/article3' },
    ];

    const filterFn = (article) => article.title.includes('Article 2');

    const expectedOutput = [
      { title: 'Article 2', link: 'https://example.com/article2' },
    ];

    const result = scrappService.filterArticles(articles, filterFn);

    expect(result).to.deep.equal(expectedOutput);
  });
  it('cleanArticles should return the articles cleaned', () => {
    const articles = [
      { title: 'Article 1\n\t', link: 'https://example.com/article1' },
      { title: 'Article 2\n\t', link: 'https://example.com/article2' },
      { title: 'Article 3\n\t', link: 'https://example.com/article3' },
    ];

    const expectedOutput = [
      { title: 'Article 1  ', link: 'https://example.com/article1' },
      { title: 'Article 2  ', link: 'https://example.com/article2' },
      { title: 'Article 3  ', link: 'https://example.com/article3' },
    ];

    const result = scrappService.cleanArticles(articles);

    expect(result).to.deep.equal(expectedOutput);
  });
  it('noKeyword should return a function that always returns true', () => {
    const filterFn = scrappService.noKeyword();

    expect(filterFn()).to.equal(true);
  });

  it('withKeyword should return a function that checks if the keyword exists in the body', () => {
    const article = {
      title: 'Article with Keyword',
      link: 'https://example.com/article1',
    };

    const filterFn = scrappService.withKeyword('keyword');
    const resultWithKeyword = filterFn(article);

    const filterFnNoKeyword = scrappService.withKeyword('Not Found');
    const resultNoKeyword = filterFnNoKeyword(article);

    expect(resultWithKeyword).to.equal(true);
    expect(resultNoKeyword).to.equal(false);
  });

  it('should return an array of articles when given a valid HTML', async () => {
    const url = 'https://www.example.com/';
    const objectClass = '.article';

    const result = await scrappService.callingFunctions(
      url,
      objectClass,
      'keyword',
    );
    console.log(result);
    expect(result).to.be.an('array');

    expect(result[0]).to.have.property('title');
    expect(result[0]).to.have.property('link');
  });
});

describe('Edge Cases : Unit Tests', () => {
  it('fetchUrl should fail if the url is not valid ', async () => {
    const testScrap = 'www.lanacion';
    const response = await scrappService.fetchUrl(testScrap);
    expect(response).to.be.equal(`getaddrinfo ENOTFOUND www.lanacion`);
  });

  it('fetchUrl should fails it the url is not a url', async () => {
    const testScrap = 'lanacion';
    const response = await scrappService.fetchUrl(testScrap);
    expect(response).to.be.equal(`URL must be a string, not undefined`);
  });

  it('fetchUrl should  fail if the url is empty', async () => {
    const testScrap = '';
    const response = await scrappService.fetchUrl(testScrap);
    expect(response).to.be.equal('URL must be a string, not undefined');
  });

  it('checkInputContent should return bad request if it does not contain a valid url', () => {
    const testScrap = {
      url: '',
      objectClass: '.class',
    };
    try {
      scrappService.checkInputContent(testScrap.url, testScrap.objectClass);
    } catch (error) {
      expect(error.message).to.be.equal('bad request');
      expect(error.statusCode).to.be.equal(400);
    }
  });
});
