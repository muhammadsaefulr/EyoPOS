import { db } from "@/drizzle/db";
import { productCategory } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const results = await db.select().from(productCategory);

        return NextResponse.json({message: "Berhasil mengambil semua data category", data: results}, {status: 200})
    } catch (err){
        return NextResponse.json({ message: `Unknown 500 Error: ${err}`}, {status: 500});
    }
}