import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
    try{
        const { filename, html } = await req.json();

        if(!filename || !html){
            return NextResponse.json({message: "Missing body params"}, {status: 400});
        }

        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        await browser.close();

        return new NextResponse(pdfBuffer, { headers: {'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename=${filename}.pdf`} });
    } catch (error) {
        return NextResponse.json(
            { error: `Unknown 500 Error ${error}` },
            { status: 500 },
          );
    }
}