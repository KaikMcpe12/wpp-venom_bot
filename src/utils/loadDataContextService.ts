// import { readPDF } from "../lib/readPdf";
import fs from 'fs'

export async function loadDataContext() {
  // const pdfChuncks = await readPDF('../../../data/document.pdf');
  const systemContentDetails = fs.readFileSync('data/system.txt', 'utf-8')

  return systemContentDetails
}
