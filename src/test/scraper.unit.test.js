const request = require('supertest');
const { expect } = require('chai');
myRequest = request('http://localhost:5000/api');
import scrappService from '../services/scrapper';

describe('should return status 200', () => {
  it('should fetch the url and return status code 200 ', async () => {
    const testScrap = 'https://www.lanacion.com.ar/';
    const response = scrappService.fetchUrl(testScrap);
    console.log(response);
  });
});
