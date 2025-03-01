import { db } from "@/drizzle/db";
import { orderItems, orders } from "@/drizzle/schema";
import { OrderSchemaZod } from "@/types/OrderProductTypes";
import { generateOrderNumber } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {

    const body = await req.json()

    const validatedData = OrderSchemaZod.parse(body)

    const newOrder = await db.transaction(async (tx) => {
       
        const [insertOrder] = await tx
          .insert(orders)
          .values({
            id: generateOrderNumber(), 
            customerName: validatedData.customerName,
            totalPrice: validatedData.totalPrice,
          })
          .returning({
            id: orders.id,
            customerName: orders.customerName,
            totalPrice: orders.totalPrice,
            status: orders.status,
          });; 
      
        await tx.insert(orderItems).values(
          validatedData.items.map((item) => ({
            orderId: insertOrder.id, 
            productId: item.productId,
            categoryId: item.categoryId,
            pricePerItem: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
          }))
        );

        return {
            order: insertOrder,
        }
      });

      return NextResponse.json({message: "Berhasil membuat order", data: newOrder.order})

    } catch(error){
         if (error instanceof z.ZodError) {
                return NextResponse.json({ error: error.errors }, { status: 400 });
            }
            return NextResponse.json({ error: `Unknown 500 Error ${error}` }, { status: 500 });
        }
}