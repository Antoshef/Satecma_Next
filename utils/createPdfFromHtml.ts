import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import { ReadableStream as PolyfillReadableStream } from "web-streams-polyfill";

if (typeof globalThis.ReadableStream === "undefined") {
  (globalThis as any).ReadableStream = PolyfillReadableStream;
}

export const convertHTMLToPDF = async (html: string, css: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.setContent(html);
    await page.addStyleTag({ content: css });
    await page.emulateMediaType("screen");
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    return pdfBuffer;
  } catch (error) {
    console.error("Error in offer generation or sending email:", error);
    return null;
  } finally {
    await browser.close();
  }
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
