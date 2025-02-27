"use client";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { ProductForm } from "../components/ProductForm";

export function ProductCreate() {
  const [refresh, setRefresh] = useState(false);

  return (
    <Container>
      <Box mt={"10%"} p={2}>
        <ProductForm onProductAdded={() => setRefresh(!refresh)} />
      </Box>
    </Container>
  );
}
