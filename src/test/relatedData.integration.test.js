import Request from 'supertest';
import { expect } from 'chai';
import { baseUrl } from './scraper.integration.test';

const myRequest = Request(baseUrl);

describe('Positive cases: Integration Test', () => {
  it('should not return related results that contain the keyword', async () => {
    const body = {
      keyWord: '',
    };
    const response = await myRequest.get('/related').send(body);
    expect(response.text).to.be.equal(
      '"withouth keyword we cannot get related results"',
    );
    expect(response.statusCode).to.be.equal(200);
  });
  it('should not return related results that contain the keyword', async () => {
    const body = {
      keyWord: 'dólar',
    };
    const response = await myRequest.get('/related').send(body);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.be.an('array').that.is.not.empty;

    const keyword = body.keyWord.toLowerCase();

    response.body.forEach((item) => {
      expect(item.title.toLowerCase()).to.contain(keyword);
    });
  });
  it('should return an empty array', async () => {
    const body = {
      keyWord: 'casasdasd',
    };
    const response = await myRequest.get('/related').send(body);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.deep.equal([]);
  });
});
