import { db } from "@/drizzle/db";
import { productCategory } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";
import { z } from "zod";

export async function DELETE(reqp: NextApiRequest) {
    try {
        const { paramId } = reqp.query;
        const isExist = await db.select().from(productCategory).where(eq(productCategory.id, parseInt(paramId as string)))

        if(!isExist){
            return NextResponse.json({message: `Kategori dengan id ${paramId} tidak ditemukan!`}, {status: 404})
        }

        db.delete(productCategory).where(eq(productCategory.id, parseInt(paramId as string)))

        return NextResponse.json({message: `Berhasil menghapus kategori denan id ${paramId}`})
    } catch(err){
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.errors }, { status: 400 });
        }
            
        return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}