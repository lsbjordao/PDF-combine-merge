const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function combinePDFs() {
  const pdfDoc = await PDFDocument.create();
  const inputFolderPath = './input'; // Caminho para a pasta "input"

  // Lê os nomes de todos os arquivos na pasta "input"
  const fileNames = fs.readdirSync(inputFolderPath);

  // Filtra apenas os arquivos PDF
  const pdfFileNames = fileNames.filter((fileName) => fileName.toLowerCase().endsWith('.pdf'));

  // Ordena os nomes dos arquivos em ordem alfabética
  const sortedFileNames = pdfFileNames.sort();

  for (const fileName of sortedFileNames) {
    const filePath = path.join(inputFolderPath, fileName);
    const pdfBytes = fs.readFileSync(filePath);
    const tempDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await pdfDoc.copyPages(tempDoc, tempDoc.getPageIndices());
    copiedPages.forEach((page) => pdfDoc.addPage(page));
  }

  const combinedPdfBytes = await pdfDoc.save();
  const outputPath = './output/resultado.pdf'; // Caminho para o arquivo de saída combinado

  fs.writeFileSync(outputPath, combinedPdfBytes);
  console.log('Arquivos PDF combinados com sucesso!');
}

combinePDFs().catch((error) => console.error(error));
