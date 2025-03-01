import { db } from "@/drizzle/db";
import { products, restocks } from "@/drizzle/schema";
import { RestockSchema } from "@/types/ProductTypes";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const validatedData = RestockSchema.parse(body);

        const productIsExist = await db.select().from(products).where(eq(products.id, validatedData.productId))

        if(!productIsExist){
            return NextResponse.json({message: `Product dengan id ${validatedData.productId} tidak ditemukan !`}, {status: 404})
        }

        await db.insert(restocks).values({
            productId: validatedData.productId,
            pricePerUnit: validatedData.pricePerUnit,
            quantity: validatedData.quantity,
            totalCost: validatedData.totalCost,
            restockedBy: validatedData.restockedByUserId,
        })

        await db.update(products).set({
            stock: sql`${products.stock} + ${validatedData.quantity}`,
            distPrice: validatedData.pricePerUnit
        })

        return NextResponse.json({message: `Berhasil merestock produk ${productIsExist.at(0)?.name} dengan jumlah restock ${validatedData.quantity}`})

    } catch (error){
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
            return NextResponse.json({ error: `Unknown 500 Error ${error}` }, { status: 500 });
    }
}   