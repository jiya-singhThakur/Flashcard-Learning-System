export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdfParseModule: any = await import("pdf-parse");
    const pdfParse = pdfParseModule.default || pdfParseModule;

    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error("PDF ERROR:", error);
    throw error;
  }
}