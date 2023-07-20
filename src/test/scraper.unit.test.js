import scrappService from '../services/scrapper';
import { expect } from 'chai';

describe('should return status 200', () => {
  it('should fetch the url and return status code 200 ', async () => {
    const testScrap = 'https://www.lanacion.com.ar/';
    const response = await scrappService.fetchUrl(testScrap);
    expect(response).contain('</html');
  });

  it('should not return any error if objectClass and url exists', () => {
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
  it('should  return an array with articles when given an valid html', () => {
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
});
