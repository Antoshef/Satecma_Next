import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import { ReadableStream as PolyfillReadableStream } from "web-streams-polyfill";

if (typeof globalThis.ReadableStream === "undefined") {
  (globalThis as any).ReadableStream = PolyfillReadableStream;
}

export const convertHTMLToPDF = async (html: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  return pdfBuffer;
};

export const addTextToPDF = async (pdfBuffer: Buffer) => {
  const existingPdfDoc = await PDFDocument.load(pdfBuffer);

  const pages = existingPdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawText("", {
    x: 50,
    y: 750,
    size: 12,
  });

  const newPdfBytes = await existingPdfDoc.save();
  return newPdfBytes;
};
