const ExcelJS = require('exceljs');
const path = require('path');

async function readExcel() {
  const filePath = path.join(__dirname, 'Portfolio_Leads.xlsx');
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet('Leads');
    if (sheet) {
      console.log(`Sheet has ${sheet.rowCount} rows`);
      sheet.eachRow((row, rowNumber) => {
        console.log(`Row ${rowNumber}:`, JSON.stringify(row.values));
      });
    } else {
      console.log('No Leads sheet found.');
    }
  } catch(e) {
    console.log('Error reading file:', e.message);
  }
}

readExcel();
