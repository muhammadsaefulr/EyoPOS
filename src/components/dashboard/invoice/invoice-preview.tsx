"use client"
import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetInvoiceByIdMutation } from "@/lib/reactquery/QueryLists";
import { formatIDR } from "@/lib/utils";
// import { useEffect } from "react";

interface InvoiceItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  items: InvoiceItem[];
}

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

export function InvoicePreview({ invoiceData }: InvoicePreviewProps) {
  const totalAmount = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  // const getInvoiceByIdMutation = useGetInvoiceByIdMutation();

  // useEffect(() => {
  //   getInvoiceByIdMutation.mutate(invoiceId as string);
  // }, [invoiceId]);

  // useEffect(() => {
  //   console.log(getInvoiceByIdMutation.data);
  // }, []);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>
          <Logo className="text-2xl" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Invoice #{invoiceData.invoiceNumber}
              </h2>
              <p>Date: {invoiceData.date}</p>
              <p>Due Date: {invoiceData.dueDate}</p>
            </div>
            <div className="">
              <h2>www.ayopos.com</h2>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Invoice To:</h3>
            <p>{invoiceData.customerName}</p>
            <p>{invoiceData.customerEmail}</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatIDR(item.price)}</TableCell>
                  <TableCell>
                    {formatIDR(item.quantity * item.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-right">
            <p className="font-bold">Total Amount: {formatIDR(totalAmount)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
