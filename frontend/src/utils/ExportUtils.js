import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Exportar a Excel
export function exportToExcel(data, fileName = 'clientes.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
}

// Exportar a PDF
export function exportToPDF(data, fileName = 'clientes.pdf') {
  const doc = new jsPDF();
  const headers = Object.keys(data[0] || {});
  const rows = data.map(obj => headers.map(h => obj[h]));

  autoTable(doc, {
    head: [headers],
    body: rows,
    styles: { fontSize: 8 },
  });

  doc.save(fileName);
}
