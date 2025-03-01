import { db } from "@/drizzle/db";
import { productCategory } from "@/drizzle/schema";
import { CategoryProductSchemaZod } from "@/types/ProductTypes";
import { eq } from "drizzle-orm";
import {  NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { id } = params;
        const validatedData = CategoryProductSchemaZod.parse(body);

        const isExist = await db.select().from(productCategory).where(eq(productCategory.id, id))

        if(!isExist){
            return NextResponse.json({message: `Category with id ${id} not exist !`}, {status: 404})
        }

        const updatedRes = await db.update(productCategory).set(validatedData).where(eq(productCategory.id, id))

        return NextResponse.json({message: `Berhasil mengupdate kategori dengan id ${id}`, data: updatedRes})
    } catch(err){
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.errors }, { status: 400 });
        }
        return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}

export async function DELETE( req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const isExist = await db.select().from(productCategory).where(eq(productCategory.id, id))

        if(!isExist){
            return NextResponse.json({message: `Kategori dengan id ${id} tidak ditemukan!`}, {status: 404})
        }

        await db.delete(productCategory).where(eq(productCategory.id, id))

        return NextResponse.json({message: `Berhasil menghapus kategori denan id ${id}`})
    } catch(err){
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.errors }, { status: 400 });
        }
            
        return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}