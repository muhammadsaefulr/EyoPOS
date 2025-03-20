import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDateToStr } from "@/lib/datelib/datelib";
import { formatIDR } from "@/lib/utils";
import { ProductOrder } from "@/types/OrderProductTypes";

export default function RecentTransactions({ data }: { data: ProductOrder[] }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Penjualan Terakhir</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>IDR</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction, keyIdx) => (
              <TableRow key={keyIdx}>
                <TableCell>{transaction.productName}</TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>{formatIDR(transaction.totalPrice ?? 0)}</TableCell>
                <TableCell>{formatDateToStr(new Date(transaction.createdAt ?? ""))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

