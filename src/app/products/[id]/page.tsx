"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductService } from "../../service/ProductService";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const productService = new ProductService();

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id));
    }
  }, [id]);

  const fetchProductById = async (productId: number) => {
    try {
      const data = await productService.getProductId(productId);
      setProduct(data);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  if (!product) {
    return <Typography variant="h6">Carregando...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            ⭐ {product.rating.rate} / 5
          </Typography>
          <Typography variant="h5" color="primary">
            R$ {product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => router.push("/")}
      >
        Voltar
      </Button>
    </Box>
  );
}
