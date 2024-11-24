import pdf from 'pdf-parse';
import fs from 'fs';

export async function readPDF(filePath: string) {
    const pdfBytes = await fs.promises.readFile(__dirname+filePath);
    const data = await pdf(pdfBytes);
    return data.text;
}
