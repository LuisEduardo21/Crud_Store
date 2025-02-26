"use client";

import { Box, Button, Input, TextField } from "@mui/material";
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
  });
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
    await productService.create(product);
    onProductAdded();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <TextField
        label="Preço"
        type="number"
        variant="outlined"
        fullWidth
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
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />

      {/* Upload de Imagem */}
      <Input
        type="file"
        inputProps={{ accept: "image/*" }}
        onChange={handleImageUpload}
      />

      {/* Preview da Imagem */}
      {product.image && (
        <img
          src={product.image}
          alt="Preview"
          style={{ maxWidth: "200px", marginTop: "10px" }}
        />
      )}

      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </Box>
  );
}
