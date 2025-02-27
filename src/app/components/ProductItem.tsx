import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useProductActions } from "../hooks/useProductActions";
import { Product } from "../types/Product";
import { EditProductDialog } from "./modals/EditProductDialog";
import { DeleteProductDialog } from "./modals/DeleteProductDialog";

interface Props {
  product: Product;
  onDelete: () => void;
}

export function ProductItem({ product, onDelete }: Props) {
  const { deleteProduct, editProduct, snackbar, closeSnackbar } =
    useProductActions();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
        }}
      >
        {product.image && (
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
        )}
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {product.description}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            ⭐ {product.rating.rate} / 5
          </Typography>
          <Typography variant="h6">R$ {product.price.toFixed(2)}</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              variant="outlined"
              sx={{ mb: 1 }}
              onClick={() => setOpenEdit(true)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenDelete(true)}
              sx={{ backgroundColor: "#BF073B" }}
            >
              Excluir
            </Button>
          </Box>
        </CardContent>
      </Card>

      <EditProductDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={(p) => editProduct(p, () => setOpenEdit(false))}
        product={product}
      />
      <DeleteProductDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => deleteProduct(product.id, onDelete)}
        productName={product.name}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
