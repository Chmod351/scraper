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
});
