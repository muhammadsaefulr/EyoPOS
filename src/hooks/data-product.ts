export type Product = {
    id?: string
    name: string
    price: number
    distPrice: number,
    category: string
    status: "in_stock" | "low_stock" | "out_of_stock"
    stock: number
    createdAt: string
  }
  
  export const productsInit: Product[] = [
    {
      id: "PROD-1234",
      name: "Wireless Earbuds Pro",
      price: 62000,
      distPrice: 50000,
      category: "Electronics",
      status: "in_stock",
      stock: 45,
      createdAt: "2024-01-15",
    },
    {
      id: "PROD-1235",
      name: "Charger Robot T20",
      price: 90000,
      distPrice: 82000,
      category: "Electronics",
      status: "low_stock",
      stock: 45,
      createdAt: "2024-01-15",
    },
  ]
  
  