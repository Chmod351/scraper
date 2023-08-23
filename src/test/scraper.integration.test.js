import Request from 'supertest';
import { expect } from 'chai';
// import envConfig from '../config/envConfig';
const baseUrl = 'https://scraper-5ask.onrender.com/api/v1';
// const baseUrl = `${envConfig.host}:${envConfig.port}/api/v1`;

describe('Edge Cases: Integration Tests', () => {
  it('should return statusCode 400 bad request /api/scrappe', async () => {
    const myRequest = Request(baseUrl);
    const testScrap = {
      url: '',
      objectClass: '.post',
      keyWord: 'linux',
    };
    const response = await myRequest.post('/scrappe').send(testScrap);
    expect(response.text).to.be.equal('{"error":"bad request"}');
  });
  it('should return statusCode 400 bad request /api/scrappe', async () => {
    const myRequest = Request(baseUrl);
    const testScrap = {
      url: '',
      objectClass: '',
      keyWord: '',
    };
    const response = await myRequest.post('/scrappe').send(testScrap);
    expect(response.statusCode).to.be.equal(400);
  });
  it('should return statusCode 400 bad request /api/scrappe', async () => {
    const myRequest = Request(baseUrl);
    const testScrap = {
      url: 'https://www.lanacion.com.ar/',
      objectClass: '',
      keyWord: 'linux',
    };
    const response = await myRequest.post('/scrappe').send(testScrap);
    expect(response.text).to.be.equal('{"error":"bad request"}');
  });
  it('should redirect to /public/scrapper.html if the route does not exists', async () => {
    const myRequest = Request(baseUrl);
    const testScrap = {
      url: 'https://www.random.com/',
      objectClass: '',
      keyWord: 'linux',
    };
    const response = await myRequest.post('/scrape').send(testScrap);
    expect(response.text).to.be.equal(
      'Found. Redirecting to /public/scrapper.html',
    );
  });
});

describe('Normal Cases: Integration Tests', () => {
  it('should return statuscode 200 /api/scrappe', async () => {
    const myRequest = Request(baseUrl);
    const testScrap = {
      url: 'https://ciervademo.onrender.com/',
      keyWord: 'informal',
      objectClass: '.sc-JrDLc eryktK',
    };
    const response = await myRequest.post('/scrappe').send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
  it('should return statusCode 200 /api/scrappe', async () => {
    const myRequest = Request(baseUrl);
    const testScrap = {
      url: 'https://ciervademo.onrender.com/',
      keyWord: '',
      objectClass: '.sc-JrDLc eryktK',
    };
    const response = await myRequest.post('/scrappe').send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
});
