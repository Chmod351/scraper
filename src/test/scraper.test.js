import Request from 'supertest';
import { expect } from 'chai';
const myRequest = Request('http://localhost:5000/api');

describe('scrape should faild with status 400 when an invalid request is done', () => {
  it('should return statusCode 400 bad request /api/scrape/', async () => {
    const testScrap = {
      url: '',
      objectClass: '.post',
      keyWord: 'linux',
    };
    const response = await myRequest.post('/scrape').send(testScrap);
    expect(response.text).to.be.equal('{"error":"bad request"}');
  });
  it('should return statusCode 400 bad request /api/scrape', async () => {
    const testScrap = {
      url: '',
      objectClass: '',
      keyWord: '',
    };
    const response = await myRequest.post('/scrape').send(testScrap);
    expect(response.statusCode).to.be.equal(400);
  });
  it('should return statusCode 400 bad request /api/scrape/', async () => {
    const testScrap = {
      url: 'https://www.lanacion.com.ar/',
      objectClass: '',
      keyWord: 'linux',
    };
    const response = await myRequest.post('/scrape').send(testScrap);
    expect(response.text).to.be.equal('{"error":"bad request"}');
  });
});

describe(' scrape should return  status 200 when an valid request is provided', () => {
  it('should return statuscode 200 /api/scrape/', async () => {
    const testScrap = {
      body: {
        url: 'https://www.lanacion.com.ar/',
        keyWord: 'dolar',
        objectClass: '.ln-link',
      },
    };
    const response = await myRequest.post('/scrape').send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
  it('should return statusCode 200 /api/scrape', async () => {
    const testScrap = {
      body: {
        url: 'https://www.lanacion.com.ar/',
        keyWord: '',
        objectClass: '.ln-link',
      },
    };
    const response = await myRequest.post('/scrape').send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
});
