"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InvoicePreview } from "@/components/dashboard/invoice/invoice-preview"

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    date: "",
    dueDate: "",
    customerName: "",
    customerEmail: "",
    items: [{ productName: "", quantity: 0, price: 0 }],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInvoiceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setInvoiceData((prev) => ({ ...prev, items: newItems }))
  }

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { productName: "", quantity: 0, price: 0 }],
    }))
  }

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index)
    setInvoiceData((prev) => ({ ...prev, items: newItems }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={invoiceData.date} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={invoiceData.customerName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={invoiceData.customerEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <Input
                  placeholder="ProductName"
                  value={item.productName}
                  onChange={(e) => handleItemChange(index, "productName", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", Number.parseFloat(e.target.value))}
                />
                <Button variant="destructive" onClick={() => removeItem(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button onClick={addItem}>Add Item</Button>
          </CardFooter>
        </Card>
      </div>

      <InvoicePreview invoiceData={invoiceData} />

      <div className="download-btn pt-6 flex justify-end">
        <Button onClick={() => void(0)}>Download Invoice</Button>
      </div>
    </div>
  )
}

