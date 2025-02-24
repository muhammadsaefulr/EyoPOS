import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle, AlertTriangle } from "lucide-react";
import type { ProductCatgoryData } from "@/hooks/data-product";
import { useAddCategoryProductMutation, useDeleteCategoryProductByIdMutation, useGetAllCategoryProductQuery, useUpdateCategoryProductMutation } from "@/lib/reactquery/QueryLists";
import { generateHexId7 } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function CategoryProductDrawer() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<ProductCatgoryData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCatgoryData | null>(null);

  const { data: category, isLoading } = useGetAllCategoryProductQuery();
  const addCategoryMutate = useAddCategoryProductMutation();
  const updateCategoryMutate = useUpdateCategoryProductMutation();
  const deleteCategoryMutate = useDeleteCategoryProductByIdMutation();

  useEffect(() => {
    setCategories(category?.data ?? []);
  }, [category]);

  const handleAddCategory = () => {
    setCategories([...categories, { id: generateHexId7(), categoryName: "" }]);
  };

  const handleChangeCategory = (id: string, newName: string) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, categoryName: newName } : cat)));
  };

  const handleDelete = (id: string) => {
    // setCategories(categories.filter((cat) => cat.id !== id));
    setOpenDeleteAlert(false);
  };

  const handleSave = () => {
    categories.forEach((cat) => {
      if (!cat.categoryName.trim()) return; 

      if (category?.data.some((existingCat: ProductCatgoryData) => existingCat.id === cat.id)) {
        updateCategoryMutate.mutate({ category: cat, paramId: cat.id });

        updateCategoryMutate.isSuccess ? toast({ title: "Berhasil", description: `Berhasil menghapus data` }) : toast({ variant: "destructive", title: "An Error Occurred", description: `Failed to remove data`});
      } else {
        addCategoryMutate.mutate(cat);
      }
    });

    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="w-full md:w-auto" asChild>
          <Button className="w-full flex justify-center bg-transparent text-black outline-0 gap-2">
            <PlusCircle className="w-5 h-5" />
            Manage Category
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
            <AlertDialogAction onClick={() => deleteCategoryMutate.mutate(selectedCategory?.id ?? "")}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
