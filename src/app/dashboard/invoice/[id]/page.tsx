"use client";
import {
  InvoiceData,
  InvoicePreview,
} from "@/components/dashboard/invoice/invoice-preview";
import { useGetInvoiceByIdQuery } from "@/lib/reactquery/QueryLists";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function InvoiceDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetInvoiceByIdQuery(params.id);

  const [dataInvoice, setDataInvoice] = useState<InvoiceData>({
    invoiceNumber: "",
    date: "",
    dueDate: "",
    customerName: "",
    subtotal: 0,
    items: [],
  });

  useEffect(() => {
    if (data && data.orderInfo) {
      setDataInvoice((prev) => ({
        ...prev,
        invoiceNumber: data?.orderInvoice?.id ?? "kontol",
        date: data?.orderInvoice?.issuedAt ?? "",
        dueDate: data?.orderInvoice?.dueDate ?? "",
        customerName: data?.orderInfo?.customerName ?? "",
        subtotal: data?.orderInfo?.subtotal ?? 0,
        items:
          data?.orderItem?.map((item) => ({
            productName: item.productName,
            price: item.pricePerItem,
            quantity: item.quantity,
          })) ?? [],
      }));
    }
  }, [data]);

  useEffect(() => {
    console.log("State updated:", dataInvoice);
  }, [dataInvoice]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }
  return (
    <div>
      <InvoicePreview invoiceData={dataInvoice} />
    </div>
  );
}
