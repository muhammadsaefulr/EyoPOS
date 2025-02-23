import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { ProductSchemaZod } from "@/hooks/data-product";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = req.json()
        const { id } = params;
        const validatedData = await ProductSchemaZod.parse(body);

        const isExit = db.select().from(products).where(eq(products.id, id as string))
        if(!isExit){
            return NextResponse.json({message: `Produk dengan id ${id} tidak ditemukan !`}, {status: 404})
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
        }).where(eq(products.id, id as string))

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
        const { id } = params;

        const isExist = await db.select().from(products).where(eq(products.id, id as string))

        if (!id || typeof id !== 'string') {
            return NextResponse.json({ message: 'ID parameter tidak valid.' }, { status: 400 });
        }

        if(!isExist){
            return NextResponse.json({message: `Produk dengan id ${id} tidak ditemukan !`}, {status: 404})
        }

        await db.delete(products).where(eq(products.id, id as string))

        return NextResponse.json({message: `Berhasil menghapus produk dengan id ${id}`})
    } catch(err){
            return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}