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
});
