import { Order } from "@/types/OrderProductTypes";

export const orders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    totalPrice: 12599, 
    status: "completed",
    createdAt: new Date("2025-02-28T14:30:00"),
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    totalPrice: 8950,
    status: "processing",
    createdAt: new Date("2025-03-01T09:15:00"),
  },
  {
    id: "ORD-003",
    customerName: "Robert Johnson",
    totalPrice: 21075,
    status: "pending",
    createdAt: new Date("2025-03-01T11:45:00"),
  },
  {
    id: "ORD-004",
    customerName: "Emily Davis",
    totalPrice: 4525,
    status: "completed",
    createdAt: new Date("2025-02-27T16:20:00"),
  },
  {
    id: "ORD-005",
    customerName: "Michael Wilson",
    totalPrice: 15000,
    status: "cancelled",
    createdAt: new Date("2025-03-01T10:30:00"),
  },
];
