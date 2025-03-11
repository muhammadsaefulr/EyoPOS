import { db } from "@/drizzle/db";
import { invoices, orderItems, orders } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const returnInvoice = await db.transaction(async (tx) => {
      const invoice = await tx
        .select()
        .from(invoices)
        .where(eq(invoices.id, id))
        .then((row) => row[0]);

      console.log("debug invoice:", invoice);

      if (invoice === undefined) {
        return null;
      }

      const [orderInfo, orderItem] = await Promise.all([
        tx
          .select()
          .from(orders)
          .where(eq(orders.id, invoice.orderId))
          .then((row) => row[0]),

        tx
          .select()
          .from(orderItems)
          .where(eq(orderItems.orderId, invoice.orderId)),
      ]);

      return {
        orderInvoice: invoice,
        orderInfo: orderInfo,
        orderItem: orderItem,
      };
    });

    if (returnInvoice === null) {
      return NextResponse.json({
        message: `Invoice dengan id ${id} tidak ditemukan`,
        data: null,
      });
    }

    return NextResponse.json({
      message: `Berhasil mengambil invoice ${id}`,
      data: returnInvoice,
    });
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
