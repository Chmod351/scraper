import { expect } from 'chai';
import ExcelService from '../scrapper/xlsx/xlsxService.js';

describe('ExcelService Unit Tests', () => {
  let excelService;

  beforeEach(() => {
    excelService = new ExcelService();
  });

  it('should generate Excel buffer with correct data', async () => {
    const data = [
      { title: 'Article 1', link: 'https://example.com/article1' },
      { title: 'Article 2', link: 'https://example.com/article2' },
    ];
    const websiteUrl = {
      url: 'https://www.url.com.ar',
      scrapedTimes: 69,
    };

    const excelBuffer = await excelService.generateExcel(data, websiteUrl);

    expect(excelBuffer).to.be.an.instanceOf(Buffer);
  });

  it('should throw BadRequestError if data is missing', async () => {
    const websiteUrl = {
      url: 'https://www.url.com.ar',
      scrapedTimes: 69,
    };

    try {
      await excelService.generateExcel(undefined, websiteUrl);
    } catch (error) {
      expect(error.name).to.equal('BadRequestError');
      expect(error.message).to.equal('required fields missed');
    }
  });

  it('should throw BadRequestError if websiteUrl is missing', async () => {
    const data = [
      { title: 'Article 1', link: 'https://example.com/article1' },
      { title: 'Article 2', link: 'https://example.com/article2' },
    ];

    try {
      await excelService.generateExcel(data, undefined);
    } catch (error) {
      expect(error.name).to.equal('BadRequestError');
      expect(error.message).to.equal('required fields missed');
    }
  });
});
