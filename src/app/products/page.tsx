"use client";

import { Box, Typography } from "@mui/material";

import { ProductList } from "../components/ProductList";

export default function ProductsPage() {
  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 3 }}>
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        fontWeight={"bold"}
        color={"primary"}
      >
        Lista de Produtos
      </Typography>

      <ProductList />
    </Box>
  );
}
