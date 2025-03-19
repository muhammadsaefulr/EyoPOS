import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ProductOrder } from "@/types/OrderProductTypes"
import { formatDate } from "@/lib/datelib/datelib"

interface ChartPenjualanProps {
  productOrder: ProductOrder[]
}

type ProductSalesMap = {
  date: string;
} & Record<string, number>;

export default function ChartPenjualan({ productOrder }: ChartPenjualanProps) {
  const topProducts = Object.values(
    productOrder.reduce((acc, item) => {
      if (!acc[item.productName]) {
        acc[item.productName] = { name: item.productName, sales: 0 }
      }
      acc[item.productName].sales += item.quantity ?? 0
      return acc
    }, {} as Record<string, { name: string; sales: number }>)
  )
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4)

  const generateProductSalesData = (products: { name: string; sales: number }[], days: number) => {
    const groupedData = productOrder.reduce((acc, item) => {
      const createdTime = item.createdAt as string
      const date = createdTime.split("T")[0]
      if (!acc[date]) acc[date] = {}
      if (!acc[date][item.productName]) acc[date][item.productName] = 0

      acc[date][item.productName] += item.quantity ?? 0
      return acc
    }, {} as Record<string, Record<string, number>>)

    days.toString()

    return Object.keys(groupedData).map((date) => {
      return products.reduce(
        (acc, product) => {
          acc[product.name] = groupedData[date][product.name] ?? 0
          acc["date"] = date
          return acc
        },
        {} as ProductSalesMap
      )
    })
  }

  const salesData = generateProductSalesData(topProducts, 31)

  const chartConfig = Object.fromEntries(
    topProducts.map((product, index) => [
      product.name,
      {
        label: product.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      },
    ])
  ) satisfies ChartConfig

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>Top 4 Produk</CardTitle>
        <CardDescription>Top 4 produk terlaris harian selama satu bulan ini</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full max-w-full overflow-x-auto scrollbar-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
          <div style={{ width: "800px", minWidth: "800px", height: "350px" }}>
            <ChartContainer className="w-full h-full" config={chartConfig}>
              <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }} width={800} height={350}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={2}
                  interval={0}
                  tick={{ fontSize: 10 }}
                  tickFormatter={formatDate}
                />
                <Tooltip />
                {topProducts.map((product) => (
                  <Line
                    key={product.name}
                    dataKey={product.name}
                    type="monotone"
                    stroke={chartConfig[product.name].color}
                    strokeWidth={1}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
