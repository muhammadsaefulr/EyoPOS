import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { OrderDetailSchemaZod } from "@/types/OrderProductTypes";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(
  req: NextRequest,
  context: {params: {id: string}}
) {
  try {
    const body = await req.json();
    
    const { id } = await context.params;

    const validatedInput = OrderDetailSchemaZod.parse(body);

    const isExist = db
      .select()
      .from(orders)
      .where(eq(orders.id, id as string));

    if (!isExist) {
      return NextResponse.json(
        { message: `Order dengan id ${id} tidak ditemukan !` },
        { status: 404 },
      );
    }

    const updatedData = await db
      .update(orders)
      .set(validatedInput)
      .where(eq(orders.id, id))
      .returning();

    return NextResponse.json({
      message: "Berhasil mengupdate data order",
      data: updatedData,
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
