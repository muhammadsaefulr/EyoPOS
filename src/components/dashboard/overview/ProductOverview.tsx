import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const inventoryItems = [
  { id: 1, name: "Coffee Beans", stock: 50, reorderLevel: 20 },
  { id: 2, name: "Tea Bags", stock: 100, reorderLevel: 30 },
  { id: 3, name: "Cups", stock: 200, reorderLevel: 50 },
  { id: 4, name: "Milk", stock: 10, reorderLevel: 15 },
  { id: 5, name: "Sugar", stock: 25, reorderLevel: 10 },
]

export default function ProductOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Product Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.stock <= item.reorderLevel ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.stock <= item.reorderLevel ? "Low" : "OK"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

