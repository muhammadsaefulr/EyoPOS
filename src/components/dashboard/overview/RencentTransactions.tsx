import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentTransactions = [
  { id: 1, product: "Coffee", amount: 3.5, date: "2023-04-01" },
  { id: 2, product: "Sandwich", amount: 5.99, date: "2023-04-01" },
  { id: 3, product: "Book", amount: 15.0, date: "2023-04-02" },
  { id: 4, product: "T-shirt", amount: 19.99, date: "2023-04-02" },
  { id: 5, product: "Headphones", amount: 49.99, date: "2023-04-03" },
]

export default function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Pembelian Terakhir</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.product}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

