import Request from 'supertest';
import { expect } from 'chai';
import envConfig from '../config/envConfig';

const myRequest = Request(`http://localhost:${envConfig.port}/api`);

describe('Edge Cases: Integration Tests', () => {
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

describe('Normal Cases: Integration Tests', () => {
  it('should return statuscode 200 /api/scrape/', async () => {
    const testScrap = {
      url: 'https://ciervademo.onrender.com/',
      keyWord: 'informal',
      objectClass: '.sc-JrDLc eryktK',
    };
    const response = await myRequest.post('/scrape').send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
  it('should return statusCode 200 /api/scrape', async () => {
    const testScrap = {
        url: 'https://ciervademo.onrender.com/',
        keyWord: '',
        objectClass: '.sc-JrDLc eryktK',
    };
    const response = await myRequest.post('/scrape').send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
});
