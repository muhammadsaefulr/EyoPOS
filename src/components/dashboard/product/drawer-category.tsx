import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle, AlertTriangle, File } from "lucide-react";
import type { ProductCatgoryData } from "@/hooks/data-product";
import { useGetAllCategoryProductQuery } from "@/lib/reactquery/QueryLists";

export default function CategoryProductDrawer() {
  const [categories, setCategories] = useState<ProductCatgoryData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCatgoryData | null>(null);

  const { data: category, isLoading} = useGetAllCategoryProductQuery();

  useEffect(() => {
    setCategories(category?.data ?? [])
  }, [category])

  // Menambahkan kategori kosong di daftar
  const handleAddCategory = () => {
    // setCategories([...categories, { id: crypto.randomUUID(), categoryName: "" }]);
    
  };

  const handleChangeCategory = (id: number, newName: string) => {
    setCategories(categories.map(cat => (cat.id === id ? { ...cat, categoryName: newName } : cat)));
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setOpenDeleteAlert(false);
  };

  // Simpan kategori (opsional, bisa langsung disimpan di DB)
  const handleSave = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        
        <DialogTrigger className="w-full md:w-auto" asChild>
        <Button className="w-full flex items-center justify-start bg-transparent text-black outline-0 gap-2">            <PlusCircle className="w-5 h-5" /> Manage Category
          </Button> 
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Category Name</TableHead>
                <TableHead className="w-[50px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <Input 
                      value={cat.categoryName} 
                      onChange={(e) => handleChangeCategory(cat.id, e.target.value)}
                      placeholder="Enter category name"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOpenDeleteAlert(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Tombol Tambah */}
          <Button onClick={handleAddCategory} variant="outline" className="mt-2 w-full">
            + Add Category
          </Button>

          <DialogFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <AlertTriangle className="w-5 h-5 inline mr-2 text-red-500" />
          Warning
        </AlertDialogTitle>
        <AlertDialogDescription>
          Deleting this category will remove all products associated with it. Are you sure?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setOpenDeleteAlert(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => handleDelete(selectedCategory?.id ?? 0)}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
    </div>
  );
}
