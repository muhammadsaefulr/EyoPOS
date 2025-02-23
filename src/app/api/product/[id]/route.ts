import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { ProductSchemaZod } from "@/hooks/data-product";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(reqb: NextRequest, reqp: NextApiRequest) {
    try {
        const body = reqb.json()
        const { paramId } = reqp.query;
        const validatedData = await ProductSchemaZod.parse(body);

        const isExit = db.select().from(products).where(eq(products.id, paramId as string))
        if(!isExit){
            return NextResponse.json({message: `Produk dengan id ${paramId} tidak ditemukan !`}, {status: 404})
        }

        const updatedRes = db.update(products).set({
            name: validatedData.name ?? "",
            categoryId: validatedData.categoryId,
            price: validatedData.price.toString(),  
            distPrice: validatedData.distPrice.toString(),  
            sold: validatedData.sold ?? 0,
            stock: validatedData.stock,
            updatedBy: validatedData.updatedBy ?? "",
            addedBy: validatedData.addedBy ?? "",
        }).where(eq(products.id, paramId as string))

        return NextResponse.json({message: `Berhasil mengupdate produk dengan id ${paramId}`, data: updatedRes})

    } catch(err){
        if (err instanceof z.ZodError) {
        return NextResponse.json({ error: err.errors }, { status: 400 });
        }

        return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}