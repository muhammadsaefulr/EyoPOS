import { db } from "@/drizzle/db";
import { orderItems, orders, products } from "@/drizzle/schema";
import { OrderSchemaZod } from "@/types/OrderProductTypes";
import { generateOrderNumber } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { aliasedTable, eq, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = OrderSchemaZod.parse(body);

    const newOrder = await db.transaction(async (tx) => {
      const [insertOrder] = await tx
        .insert(orders)
        .values({
          id: generateOrderNumber(),
          customerName: validatedData.customerName,
          status: validatedData.status,
          totalPrice: validatedData.subtotal,
        })
        .returning({
          id: orders.id,
          customerName: orders.customerName,
          totalPrice: orders.totalPrice,
          status: orders.status,
        });

      await tx.insert(orderItems).values(
        validatedData.orderItems.map((item) => ({
          orderId: insertOrder.id,
          productId: item.productId,
          categoryId: item.categoryId,
          pricePerItem: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        })),
      );

      validatedData.orderItems.forEach(async (item) => {
        await tx
          .update(products)
          .set({
            stock: sql`${products.stock} - ${item.quantity}`,
          })
          .where(eq(products.id, item.productId));
      });

      return {
        order: insertOrder,
      };
    });

    return NextResponse.json({
      message: "Berhasil membuat order",
      data: newOrder.order,
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isIncludeProduct = searchParams.get("product");

    if (isIncludeProduct) {
      const aliasedTableOrderInfo = aliasedTable(orders, "orderInfo");
      const detailProduct = await db
        .select()
        .from(orderItems)
        .leftJoin(orders, eq(aliasedTableOrderInfo.id, orderItems.orderId));

      return NextResponse.json({
        message: "Berhasil mengambil semua info data order",
        data: detailProduct,
      });
    }

    const orderInfo = await db.select().from(orders);

    return NextResponse.json({
      message: "Berhasil mengambil semua info data order",
      data: orderInfo,
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
