import scrappService from '../services/scrapper';
import { expect } from 'chai';

describe('should return status 200', () => {
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
        <h2>Title 2</h2>
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
      { title: 'Title 2 Read more', link: 'https://example.com/article2' },
    ]);
  });
  it('removeSpecialChars should remove specials chars in the string', () => {
    const input = 'Hello\n\tWorld!';
    const expectedOutput = 'HelloWorld!';
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
      { title: 'Article 1', link: 'https://example.com/article1' },
      { title: 'Article 2', link: 'https://example.com/article2' },
      { title: 'Article 3', link: 'https://example.com/article3' },
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
});
