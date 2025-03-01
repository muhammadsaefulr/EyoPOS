import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { ProductSchemaZod } from "@/types/ProductTypes";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json()
        const { id } = params;

        if (body.updatedAt) {
            body.updatedAt = new Date(body.updatedAt);
        }
        
        const validatedData = await ProductSchemaZod.parse(body);

        const isExit = db.select().from(products).where(eq(products.id, id as string))
        if(!isExit){
            return NextResponse.json({message: `Produk dengan id ${id} tidak ditemukan !`}, {status: 404})
        }

        const updatedRes = await db.update(products).set({
            name: validatedData.name ?? "",
            categoryId: validatedData.categoryId,
            price: validatedData.price,  
            distPrice: validatedData.distPrice,  
            sold: validatedData.sold ?? 0,
            stock: validatedData.stock,
            updatedBy: validatedData.updatedBy ?? "",
            addedBy: validatedData.addedBy ?? "",
            updatedAt: validatedData.updatedAt
        }).where(eq(products.id, id as string)).returning()

        return NextResponse.json({message: `Berhasil mengupdate produk dengan id ${id}`, data: updatedRes})

    } catch(err){
        if (err instanceof z.ZodError) {
        return NextResponse.json({ error: err.errors }, { status: 400 });
        }

        return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try{
        
        const id  = params.id;
        const isExist = await db.select().from(products).where(eq(products.id, id as string))

        if(!isExist){
            return NextResponse.json({message: `Produk dengan id ${id} tidak ditemukan !`}, {status: 404})
        }

        await db.delete(products).where(eq(products.id, id as string))

        return NextResponse.json({message: `Berhasil menghapus produk dengan id ${id}`})
    } catch(err){
            return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}