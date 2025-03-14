import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetAllProductQuery } from "@/lib/reactquery/QueryLists";


export default function LowStockProduct() {
  const { data } = useGetAllProductQuery({currentPage: 1, sortBy: "stock", sortOrder: "desc"});
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Low Stock Product</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.data.filter((item) => item.stock <= 10).length === 0 ? (
          <div className="relative flex justify-center">
              <p className="text-muted-foreground absolute top-24 lg:relative">
              Semua stok produk terpenuhi</p>
          </div>   
        ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.filter((item) => item.stock <= 10).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.stock <= 10 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.stock <= 10 ? "Low" : "OK"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        )}
      </CardContent>
    </Card>
  )
}

