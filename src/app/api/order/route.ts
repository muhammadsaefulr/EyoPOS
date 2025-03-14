import { db } from "@/drizzle/db";
import { orderItems, orders, products } from "@/drizzle/schema";
import { OrderSchemaZod } from "@/types/OrderProductTypes";
import { generateOrderNumber } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { asc, between, desc, eq, sql } from "drizzle-orm";
import { getEndOfDay, getEndOfMonth, getEndOfYear, getStartOfDay, getStartOfMonth, getStartOfYear } from "@/lib/datelib/datelib";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = OrderSchemaZod.parse(body);

    const newOrder = await db.transaction(async (tx) => {
      const [insertOrder] = await tx
        .insert(orders)
        .values({
          id: generateOrderNumber(),
          customerName: validatedData.customerName,
          status: validatedData.status,
          totalPrice: validatedData.subtotal,
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
          pricePerItem: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
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
      message: "Berhasil membuat order",
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
    
    const validFilterDate = ["yearly", "monthly", "daily"]
    const filterDate = validFilterDate.includes(searchParams.get("date") || "") ? searchParams.get("date")! : "monthly";

    const now = new Date();    
    
    const dateRange = {
      daily: [getStartOfDay(now), getEndOfDay(now)],
      monthly: [getStartOfMonth(now), getEndOfMonth(now)],
      yearly: [getStartOfYear(now), getEndOfYear(now)],
    };
    
    const [startDate, endDate] = dateRange[filterDate];
    
    console.log(startDate, endDate);

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
          createdAt: row.createdAt ?? new Date().toISOString(),
          items: [],
        };
      }

      if (row.itemId) {
        acc[orderId].items.push({
          id: row.itemId,
          productName: row.productName ?? "Unknown Product",
          productId: row.productId ?? "",
          pricePerItem: row.pricePerItem ?? 0,
          quantity: row.quantity ?? 0,
          totalPrice: row.itemTotalPrice ?? 0,
          createdAt: row.itemCreatedAt ?? new Date().toISOString(),
        });
      }

      return acc;
    }, {} as Record<string, any>);

    const ordersWithItems = Object.values(groupedOrders);

    const totalCount = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(orders)
      .then((res) => res[0].count);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      message: "Berhasil mengambil semua info data order + produk",
      data: ordersWithItems,
      pagination: {
        currentPage: page ?? 1,
        totalPages,
        totalItems: totalCount,
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
