import fs from 'fs';
import PDFParser from 'pdf2json';

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync('./parsed_pdf.txt', pdfParser.getRawTextContent());
    console.log("PDF parsed and saved to parsed_pdf.txt");
});

pdfParser.loadPDF('d:/WedDev/AMath_Website/โปรแกรมเกมกลยุทธ์การต่อสมการตัวเลข.pdf');
