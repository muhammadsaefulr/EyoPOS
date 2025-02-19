import { db } from "@/drizzle/db";
import { productCategory, products } from "@/drizzle/schema";
import { ProductSchemaZod } from "@/hooks/data-product";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest){
    try {
        const result = await db.select({
            id: products.id,
            name: products.name,
            price: products.price,
            distPrice: products.distPrice,
            stock: products.stock,
            sold: products.sold,
            createdAt: products.createdAt,
            addedBy: products.addedBy,
            updatedBy: products.updatedBy,
            categoryName: productCategory.categoryName,
        }).from(products).leftJoin(productCategory, eq(products.categoryId, productCategory.id));;

        return NextResponse.json({message: "Berhasil mengambil semua data product", data: result}, {status: 200   })
    } catch (err){
        return NextResponse.json({message: `Unknown Error 500 ${err}`}, {status: 500})
    }
}

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const validatedData = ProductSchemaZod.parse(body);
  
      const insertedProduct = await db.insert(products).values({
        name: validatedData.name ?? "",
        categoryId: validatedData.categoryId,
        price: validatedData.price.toString(),  
        distPrice: validatedData.distPrice.toString(),  
        sold: validatedData.sold,
        stock: validatedData.stock,
        updatedBy: validatedData.updatedBy ?? "",
        addedBy: validatedData.addedBy ?? "",
        createdAt: Date.now().toString(),
        }).returning();
  
      return NextResponse.json({ message: "Product added successfully", product: insertedProduct[0] }, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
      }
      return NextResponse.json({ error: `Unknown 500 Error ${error}` }, { status: 500 });
    }
  }