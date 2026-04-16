export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pdfParser = new PDFParser();

    const text: string = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (errData: any) => {
         reject(errData?.parserError || "PDF parsing error");
      });

      pdfParser.on("pdfParser_dataReady", pdfData => {
        let extractedText = "";

        pdfData.Pages.forEach((page: any) => {
          page.Texts.forEach((textItem: any) => {
            textItem.R.forEach((r: any) => {
              extractedText += decodeURIComponent(r.T) + " ";
            });
          });
        });

        resolve(extractedText);
      });

      pdfParser.parseBuffer(buffer);
    });

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "No readable text in PDF" },
        { status: 400 }
      );
    }

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      { error: error.message || "PDF parsing failed" },
      { status: 500 }
    );
  }
}