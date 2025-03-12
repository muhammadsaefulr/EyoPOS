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
    if(data){
        setDataInvoice({
          invoiceNumber: data?.data.orderInvoice?.id ?? "",
          date: data?.data?.orderInvoice?.issuedAt ?? "",
          dueDate: data?.data?.orderInvoice?.dueDate ?? "",
          subtotal: data?.data?.orderInvoice.totalAmount ?? 0,
          customerName: data?.data?.orderInfo?.customerName ?? "",
          items:
            data?.data.orderItem?.map((item) => ({
              productName: item.productName,
              price: item.pricePerItem,
              quantity: item.quantity,
            })) ?? [],
        });
      }
  }, [data]);

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
