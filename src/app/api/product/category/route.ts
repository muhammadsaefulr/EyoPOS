import { db } from "@/drizzle/db";
import { productCategory } from "@/drizzle/schema";
import { CategoryProductSchemaZod } from "@/hooks/data-product";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest){
    try {
        const results = await db.select().from(productCategory);

        return NextResponse.json({message: "Berhasil mengambil semua data category", data: results}, {status: 200})
    } catch (err){
        return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const validatedData = CategoryProductSchemaZod.parse(body);

        const isExist = await db.select().from(productCategory).where(eq(productCategory.categoryName, validatedData.categoryName))

        if(isExist.length > 1){
            return NextResponse.json({"message": `Category ${validatedData.categoryName} sudah ada !`}, {status: 400})
        }

        const results = await db.insert(productCategory).values(validatedData)

        return NextResponse.json({"message": `Berhasil menambahkan kategori ${validatedData.categoryName} ke database`, data: results})

    } catch (err){
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.errors }, { status: 400 });
        }
        return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}


