import { useState } from "react";
import { ProductService } from "../service/ProductService";
import { Product } from "../types/Product";

export function useProductActions() {
  const productService = new ProductService();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const deleteProduct = async (id: number, onSuccess: () => void) => {
    try {
      await productService.delete(id);
      showSnackbar("Produto excluído com sucesso!", "success");
      onSuccess();
    } catch (error) {
      showSnackbar("Erro ao excluir o produto.", "error");
    }
  };

  const editProduct = async (
    updatedProduct: Product,
    onSuccess: () => void
  ) => {
    try {
      await productService.edit(updatedProduct, updatedProduct.id);
      showSnackbar("Produto atualizado com sucesso!", "success");
      onSuccess();
    } catch (error) {
      showSnackbar("Erro ao atualizar o produto.", "error");
    }
  };

  return {
    deleteProduct,
    editProduct,
    snackbar,
    closeSnackbar,
  };
}
