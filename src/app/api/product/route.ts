import { db } from "@/drizzle/db";
import { productCategory, products } from "@/drizzle/schema";
import { ProductSchemaZod } from "@/types/ProductTypes";
import { asc, desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
    try {

        const searchParams  = req.nextUrl.searchParams
        const page = parseInt(searchParams.get("page") || "1", 10);
        const sortBy = searchParams.get("sortBy") || "createdAt"; 
        const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc"; 

        const limit = 10;
        const offset = (page - 1) * limit;

        const validSortFields = [
            "id", "name", "price", "distPrice", "stock", 
            "createdAt", "updatedAt", "addedBy", "updatedBy", "categoryId"
        ];

        const sortColumn = validSortFields.includes(sortBy) ? products[sortBy] : products.createdAt;

        const result = await db
            .select({
                id: products.id,
                name: products.name,
                price: products.price,
                distPrice: products.distPrice,
                stock: products.stock,
                createdAt: products.createdAt,
                updatedAt: products.updatedAt,
                addedBy: products.addedBy,
                updatedBy: products.updatedBy,
                categoryId: products.categoryId,
                categoryName: productCategory.categoryName,
            })
            .from(products)
            .leftJoin(productCategory, eq(products.categoryId, productCategory.id))
            .orderBy(sortOrder === "asc" ? asc(sortColumn) : desc(sortColumn))
            .limit(limit)
            .offset(offset);

        // Ambil total count untuk pagination
        const totalCount = await db
            .select({ count: sql<number>`COUNT(*)` })
            .from(products)
            .then(res => res[0].count);

        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json(
            {
                message: "Berhasil mengambil semua data product",
                data: result,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: totalCount,
                    perPage: limit,
                },
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json({ message: `Unknown Error 500 ${err}` }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
      const body = await req.json();
      const validatedData = ProductSchemaZod.parse(body);
  
      const insertedProduct = await db.insert(products).values({
        name: validatedData.name ?? "",
        categoryId: validatedData.categoryId,
        price: validatedData.price,  
        distPrice: validatedData.distPrice,  
        stock: validatedData.stock,
        updatedBy: validatedData.updatedBy ?? "",
        addedBy: validatedData.addedBy ?? "",
        }).returning();
  
      return NextResponse.json({ message: "Product added successfully", product: insertedProduct[0] }, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
      }
      return NextResponse.json({ error: `Unknown 500 Error ${error}` }, { status: 500 });
    }
  }