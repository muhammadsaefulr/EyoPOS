import type { Order } from "@/types/OrderProductTypes"

export const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: new Date("2025-02-28T14:30:00"),
    status: "completed",
    total: 125.99,
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: new Date("2025-03-01T09:15:00"),
    status: "processing",
    total: 89.5,
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: new Date("2025-03-01T11:45:00"),
    status: "pending",
    total: 210.75,
    items: 5,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: new Date("2025-02-27T16:20:00"),
    status: "completed",
    total: 45.25,
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: new Date("2025-03-01T10:30:00"),
    status: "cancelled",
    total: 150.0,
    items: 4,
  },
]

