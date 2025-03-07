"use client"
import { InvoiceData, InvoicePreview } from '@/components/dashboard/invoice/invoice-preview'
import { useGetInvoiceByIdMutation } from '@/lib/reactquery/QueryLists'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function InvoiceDetail() {
    const params = useParams<{ id: string }>();
    const [dataInvoice, setDataInvoice] = useState<InvoiceData>({
        invoiceNumber: "",
        date: "",
        dueDate: "",
        customerName: "",
        customerEmail: "",
        items: []
    });

    const useGetInvoiceById = useGetInvoiceByIdMutation();

    // Fetch data saat komponen mount
    useEffect(() => {
        if (params.id) {
            useGetInvoiceById.mutate(params.id, {
                onSuccess: (data) => {
                    console.log("Fetched Data:", data);
                    setDataInvoice({
                        invoiceNumber: data?.orderInvoice?.id ?? "",
                        date: data?.orderInvoice?.issuedAt ?? "",
                        dueDate: data?.orderInvoice?.dueDate ?? "",
                        customerName: data?.orderInfo?.length ? data.orderInfo[0].customerName : "",
                        customerEmail: "",
                        items: data?.orderItem?.map((item) => ({
                            productName: item.productName ?? "",
                            quantity: item.quantity ?? 0,
                            price: item.pricePerItem ?? 0
                        })) ?? []
                    });
                }
            });
        }
    }, [params.id]);

    // Debug perubahan state
    useEffect(() => {
        console.log("Updated Invoice Data:", dataInvoice);
    }, [dataInvoice]);

    // Handle loading state
    if (useGetInvoiceById.isPending) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-lg font-bold'>Loading...</div>
            </div>
        );
    }

    // Handle error state
    if (useGetInvoiceById.isError) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-lg font-bold text-red-500'>Failed to load invoice</div>
            </div>
        );
    }

    // Handle not found state
    // if (!dataInvoice.customerName) {
    //     return (
    //         <div className='flex justify-center items-center h-screen'>
    //             <div className='flex flex-col items-center'>
    //                 <div className='text-3xl font-bold'>Invoice not found</div>
    //                 <div className='text-sm'>The invoice you are looking for does not exist</div>
    //             </div>
    //         </div>  
    //     );
    // }

  return (
    <div>
        <InvoicePreview invoiceData={dataInvoice}/>
    </div>
  )
}

