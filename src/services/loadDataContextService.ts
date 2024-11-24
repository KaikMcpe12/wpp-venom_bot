import { readPDF } from "../lib/readPdf";

export async function loadDataContextService() {
    const pdfChuncks = await readPDF('../../../data/document.pdf');
    const dbData = null

    return pdfChuncks + dbData
}
