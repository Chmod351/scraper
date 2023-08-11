import xlsxService from '../xlsx/xlsxService.js';
const excelService = new xlsxService();

async function exportData(req, res, next) {
  try {
    const data = req.body['found articles'];
    const websiteUrl = req.body['scanned webpage'];

    const excelBuffer = await excelService.generateExcel(data, websiteUrl);

    res.set('Content-Disposition', 'attachment; filename=articles.xlsx');
    res.set(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(excelBuffer);
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
    next(error);
  }
}

const convertToExcel = {
  exportData,
};

export default convertToExcel;
