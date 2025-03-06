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

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
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

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>
          <Logo />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">
              Invoice #{invoiceData.invoiceNumber}
            </h2>
            <p>Date: {invoiceData.date}</p>
            <p>Due Date: {invoiceData.dueDate}</p>
          </div>
          <div>
            <h3 className="font-semibold">Customer Details:</h3>
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
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-right">
            <p className="font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
