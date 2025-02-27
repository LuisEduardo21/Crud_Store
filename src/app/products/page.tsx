"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { ProductList } from "../components/ProductList";
import { AppRoutes } from "../routes/AppRoutes";

export default function ProductsPage() {
  const router = useRouter();

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Lista de Produtos
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => router.push(AppRoutes.CREATE_PRODUCT)}
      >
        Criar Novo Produto
      </Button>

      <ProductList />
    </Box>
  );
}
