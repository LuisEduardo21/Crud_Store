"use client";
import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { ProductForm } from "../components/ProductForm";

export function ProductDashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gerenciar Produtos
      </Typography>
      <ProductForm onProductAdded={() => setRefresh(!refresh)} />
    </Container>
  );
}
