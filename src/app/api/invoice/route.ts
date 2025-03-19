import { db } from "@/drizzle/db";
import { invoices } from "@/drizzle/schema";
import { generateInvoiceNumber } from "@/lib/utils";
import { OrderInvoiceSchemaZod } from "@/types/InvoiceTypes";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = OrderInvoiceSchemaZod.parse(body);
    
    const newInvoice = await db.transaction(async (tx) => {
      const [insertInvoice] = await tx
        .insert(invoices)
        .values({
          id: generateInvoiceNumber(),
          orderId: validatedData.orderId,
          totalAmount: validatedData.totalAmount,
          issuedAt: new Date(validatedData.issuedAt),
          dueDate: new Date(validatedData.dueDate),
          status: validatedData.status,
        }).returning()

        return insertInvoice;
    })
    
    return NextResponse.json({
        message: "Berhasil membuat invoice",
        data: newInvoice,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: `Unknown 500 Error ${error}` },
      { status: 500 },
    );
  }
}