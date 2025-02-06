export type Product = {
    id?: string
    name: string
    price: number
    category: string
    status: "in_stock" | "low_stock" | "out_of_stock"
    stock: number
    rating: number
    createdAt: string
  }
  
  export const productsInit: Product[] = [
    {
      id: "PROD-1234",
      name: "Wireless Earbuds Pro",
      price: 199.99,
      category: "Electronics",
      status: "in_stock",
      stock: 45,
      rating: 4.5,
      createdAt: "2024-01-15",
    },
    {
      id: "PROD-5678",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      category: "Apparel",
      status: "low_stock",
      stock: 8,
      rating: 4.2,
      createdAt: "2024-01-20",
    },
    {
      id: "PROD-9012",
      name: "Smart Watch Series X",
      price: 299.99,
      category: "Electronics",
      status: "out_of_stock",
      stock: 0,
      rating: 4.8,
      createdAt: "2024-01-25",
    },
    {
      id: "PROD-3456",
      name: "Premium Coffee Maker",
      price: 149.99,
      category: "Home & Kitchen",
      status: "in_stock",
      stock: 32,
      rating: 4.6,
      createdAt: "2024-01-28",
    },
    {
      id: "PROD-7890",
      name: "Yoga Mat Premium",
      price: 49.99,
      category: "Sports",
      status: "in_stock",
      stock: 25,
      rating: 4.3,
      createdAt: "2024-02-01",
    },
  ]
  
  