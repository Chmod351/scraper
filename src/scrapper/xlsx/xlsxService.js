import ExcelJS from 'exceljs';
import {
  BadRequestError,
} from '../../helpers/errorHandler.js';

class ExcelService {
  async generateExcel(data, websiteUrl) {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Artículos');

      worksheet.addRow(['Títle', 'Link']);

      data.forEach((article) => {
        worksheet.addRow([
          article.title,
          websiteUrl.url,
          websiteUrl.scrapedTimes,
          article.link,
        ]);
      });

      return await workbook.xlsx.writeBuffer();
    } catch (error) {
      throw new BadRequestError('required fields missed');
    }
  }
}
export default ExcelService;
