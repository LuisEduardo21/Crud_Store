import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ProductService } from "../service/ProductService";
import { Product } from "../types/Product";

interface Props {
  product: Product;
  onDelete: () => void;
}

export function ProductItem({ product, onDelete }: Props) {
  const productService = new ProductService();
  const [open, setOpen] = useState(false); // 🔹 Estado para controlar o modal

  // 🔹 Função para abrir o modal
  const handleOpen = () => {
    setOpen(true);
  };

  // 🔹 Função para fechar o modal
  const handleClose = () => {
    setOpen(false);
  };

  // 🔹 Função para excluir o produto
  const handleDelete = async () => {
    if (product.id) {
      await productService.delete(product.id);
      onDelete();
      handleClose(); // 🔹 Fecha o modal após excluir
    }
  };

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
        {/* Exibir a Imagem */}
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
            <Button variant="outlined" sx={{ mb: 1 }}>
              Editar
            </Button>
            <Button
              variant="contained"
              onClick={handleOpen} // 🔹 Abre o modal ao clicar
              sx={{ backgroundColor: "#BF073B" }}
            >
              Excluir
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 🔹 Modal de confirmação */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o produto <b>{product.name}</b>? Essa ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}