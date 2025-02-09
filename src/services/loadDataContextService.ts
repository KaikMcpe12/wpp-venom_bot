import { readPDF } from "../lib/readPdf";
import fs from 'fs';

export async function loadDataContextService() {
    // const pdfChuncks = await readPDF('../../../data/document.pdf');
    const systemContentDetails = fs.readFileSync('data/system.txt', 'utf-8');
    
    const modelfile = `
        FROM llama3.2:1b
        SYSTEM "${systemContentDetails}
    `
    // const modelfile = `
    //     FROM llama3.2:1b
    //     SYSTEM "${systemContentDetails}. Sigas as regras de ${pdfChuncks}"
    // `

    return modelfile
}
