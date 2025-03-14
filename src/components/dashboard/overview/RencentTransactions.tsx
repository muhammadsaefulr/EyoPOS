import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDateToStr } from "@/lib/datelib/datelib";
import { formatIDR } from "@/lib/utils";
import { ProductOrder } from "@/types/OrderProductTypes";

const recentTransactions = [
  { id: 1, productName: "Coffee", totalPrice: 3.5, createdAt: "2023-04-01" },
  { id: 2, productName: "Sandwich", totalPrice: 5.99, createdAt: "2023-04-01" },
  { id: 3, productName: "Book", totalPrice: 15.0, createdAt: "2023-04-02" },
]


export default function RecentTransactions({ data }: { data: ProductOrder[] }) {

  console.log(data)

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
            {data.map((transaction) => (
              <TableRow key={transaction.id}>
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

