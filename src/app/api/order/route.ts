import { db } from "@/drizzle/db";
import { orderItems, orders, products } from "@/drizzle/schema";
import { DataOrderResponse, OrderSchemaZod } from "@/types/OrderProductTypes";
import { generateOrderNumber } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { asc, between, desc, eq, inArray, sql } from "drizzle-orm";
import { getEndOfDay, getEndOfMonth, getEndOfWeek, getEndOfYear, getStartOfDay, getStartOfMonth, getStartOfWeek, getStartOfYear } from "@/lib/datelib/datelib";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = OrderSchemaZod.parse(body);

    const productIds = validatedData.orderItems.map((item) => item.productId);

    const productsStock = await db
    .select({
      id: products.id,
      stock: products.stock,
    })
    .from(products)
    .where(inArray(products.id, productIds));

    const stockMap = new Map(productsStock.map((p) => [p.id, p]));

    const outOfStock = validatedData.orderItems.find((item) => {
      const product = stockMap.get(item.productId);
      return !product || product.stock < item.quantity;
    });

    if (outOfStock) {
      return NextResponse.json(
        { message: `Stok tidak mencukupi untuk produk ${outOfStock.productName}` },
        { status: 200 }
      );
    }

    const newOrder = await db.transaction(async (tx) => {
      const [insertOrder] = await tx
        .insert(orders)
        .values({
          id: generateOrderNumber(),
          customerName: validatedData.customerName,
          status: validatedData.status,
          totalPrice: validatedData.subtotal,
          createdAt: new Date()
        })
        .returning({
          id: orders.id,
          customerName: orders.customerName,
          totalPrice: orders.totalPrice,
          status: orders.status,
        });

      await tx.insert(orderItems).values(
        validatedData.orderItems.map((item) => ({
          orderId: insertOrder.id,
          productName: item.productName,
          productId: item.productId,
          categoryId: item.categoryId,
          pricePerItem: item.pricePerItem,
          quantity: item.quantity,
          totalPrice: item.pricePerItem * item.quantity,
          createdAt: new Date()
        })),
      );

      validatedData.orderItems.forEach(async (item) => {
        await tx
          .update(products)
          .set({
            stock: sql`${products.stock} - ${item.quantity}`,
          })
          .where(eq(products.id, item.productId));
      });

      return {
        order: insertOrder,
      };
    });

    return NextResponse.json({
      message: `Berhasil membuat order ${newOrder.order.id}`,
      data: newOrder.order,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: `Unknown 500 Error ${error}` },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? asc : desc;
    
    const validFilterDate = ["yearly","weekly", "monthly", "daily"]
    const filterDate = validFilterDate.includes(searchParams.get("date") || "") ? searchParams.get("date")! : "monthly";

    const now = new Date();    
    
    const dateRange = {
      daily: [getStartOfDay(now), getEndOfDay(now)],
      weekly: [getStartOfWeek(now),getEndOfWeek(now)],
      monthly: [getStartOfMonth(now), getEndOfMonth(now)],
      yearly: [getStartOfYear(now), getEndOfYear(now)],
    };
    
    const [startDate, endDate] = dateRange[filterDate];
  
    const validSortFields = ["id", "customer_name", "total_price", "status", "createdAt"];
    const sortColumn = validSortFields.includes(sortBy) ? orders[sortBy] : orders.createdAt;

    const rawData = await db
      .select({
        orderId: orders.id,
        customerName: orders.customerName,
        totalPrice: orders.totalPrice,
        status: orders.status,
        createdAt: orders.createdAt,
        itemId: orderItems.id,
        productName: orderItems.productName,
        categoryId: orderItems.categoryId,
        productId: orderItems.productId,
        pricePerItem: orderItems.pricePerItem,
        quantity: orderItems.quantity,
        itemTotalPrice: orderItems.totalPrice,
        itemCreatedAt: orderItems.createdAt,
      })
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .orderBy(sortOrder(sortColumn))
      .limit(limit)
      .where(between(orders.createdAt, startDate, endDate))
      .offset(offset);

    // Grouping data berdasarkan `orderId`
    const groupedOrders = rawData.reduce((acc, row) => {
      const orderId = row.orderId;

      if (!acc[orderId]) {
        acc[orderId] = {
          id: orderId,
          customerName: row.customerName ?? "Unknown",
          totalPrice: row.totalPrice ?? 0,
          status: row.status ?? "pending",
          createdAt: new Date(row.createdAt).toISOString() ?? new Date().toISOString(),
          items: [],
        };
      }

      if (!acc[orderId].items) {
        acc[orderId].items = [];
      }
      
      acc[orderId].items.push({
        productName: row.productName ?? "Unknown Product",
        productId: row.productId ?? "",
        pricePerItem: row.pricePerItem ?? 0,
        quantity: row.quantity ?? 0,
        totalPrice: row.itemTotalPrice ?? 0,
        createdAt:
          row.itemCreatedAt instanceof Date
            ? row.itemCreatedAt.toISOString()
            : row.itemCreatedAt ?? new Date().toISOString(),
      });
      
      return acc;
    }, {} as Record<string, DataOrderResponse>);

    const ordersWithItems = Object.values(groupedOrders);

    const totalCount = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(orders)
      .then((res) => res[0].count);

    const totalPages = Math.ceil(totalCount / limit);

    console.log(totalCount)

    return NextResponse.json({
      message: "Berhasil mengambil semua info data order + produk",
      data: ordersWithItems,
      pagination: {
        currentPage: page || 1,
        totalPages,
        totalItems: totalCount || 0,
        perPage: limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Unknown 500 Error ${error}` },
      { status: 500 }
    );
  }
}
