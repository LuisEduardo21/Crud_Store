"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ProductService } from "../service/ProductService";
import { Product } from "../types/Product";

interface Props {
  onProductAdded: () => void;
}

export function ProductForm({ onProductAdded }: Props) {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const productService = new ProductService();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result as string });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productService.create(product);
      setMessage("Produto cadastrado com sucesso! 🎉");
      setError(null);
      setOpen(true);
      onProductAdded();
      setProduct({
        name: "",
        price: 0,
        description: "",
        image: "",
        category: "",
      });
    } catch (err) {
      setError("Erro ao cadastrar o produto! ❌" + (err as Error).message);
      setMessage(null);
      setOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 500,
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight={700}
        color="primary"
      >
        Cadastrar Produto
      </Typography>

      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <TextField
        label="Categoria"
        variant="outlined"
        fullWidth
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />
      <TextField
        label="Preço"
        type="number"
        variant="outlined"
        fullWidth
        value={product.price || ""}
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
      />
      <TextField
        label="Descrição"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />

      {/* Upload de Imagem */}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ textTransform: "none", borderRadius: "12px" }}
      >
        Escolher Imagem
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Button>

      {/* Preview da Imagem */}
      {product.image && (
        <Card sx={{ maxWidth: 300, mx: "auto", position: "relative" }}>
          <CardMedia
            component="img"
            height="180"
            image={product.image}
            alt="Preview"
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.5)",
            }}
            onClick={() => setProduct({ ...product, image: "" })}
          >
            <DeleteIcon sx={{ color: "white" }} />
          </IconButton>
        </Card>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ borderRadius: "12px" }}
      >
        Salvar Produto
      </Button>

      {/* Snackbar para Sucesso e Erro */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        {message ? (
          <Alert severity="success" onClose={() => setOpen(false)}>
            {message}
          </Alert>
        ) : (
          <Alert severity="error" onClose={() => setOpen(false)}>
            {error}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}
