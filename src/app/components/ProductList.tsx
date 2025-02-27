import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppRoutes } from "../routes/AppRoutes";
import { ProductService } from "../service/ProductService";
import { Product } from "../types/Product";
import { ProductItem } from "./ProductItem";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [category, setCategory] = useState<string>("all");
  const [priceOrder, setPriceOrder] = useState<string>("default");
  const [categories, setCategories] = useState<string[]>([]);
  const productService = new ProductService();
  const router = useRouter();

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [limit, category, priceOrder]);

  // 🔹 Buscar categorias disponíveis
  const loadCategories = async () => {
    const data = await productService.getCategoriesAll();
    setCategories(data);
  };

  // 🔹 Buscar e filtrar produtos
  const loadProducts = async () => {
    let data = await productService.getPaginationProducts(limit);

    // 🔹 Filtra por categoria (se não for "all")
    if (category !== "all") {
      data = data.filter((product) => product.category === category);
    }

    // 🔹 Ordena por rating (do maior para o menor)
    data = data
      .filter((product) => product.rating && product.rating.rate !== undefined)
      .sort((a, b) => b.rating.rate - a.rating.rate);

    // 🔹 Ordena por preço, se necessário
    if (priceOrder === "low-to-high") {
      data.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "high-to-low") {
      data.sort((a, b) => b.price - a.price);
    }

    setProducts(data);
  };

  return (
    <Box>
      {/* 🔹 Contêiner para os filtros */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "end",
          gap: 1,
          mb: 1,
        }}
      >
        {/* 🔹 Filtro por quantidade */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2, height: 55 }}
          endIcon={<AddIcon />}
          onClick={() => router.push(AppRoutes.CREATE_PRODUCT)}
        >
          Criar Novo Produto
        </Button>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Quantidade</InputLabel>
          <Select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>

        {/* 🔹 Filtro por categoria */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">Todas</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 🔹 Filtro por preço */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Preço</InputLabel>
          <Select
            value={priceOrder}
            onChange={(e) => setPriceOrder(e.target.value)}
          >
            <MenuItem value="default">Padrão</MenuItem>
            <MenuItem value="low-to-high">Menor preço</MenuItem>
            <MenuItem value="high-to-low">Maior preço</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 🔹 Grid responsivo para exibir os produtos */}
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductItem
              product={product}
              onDelete={loadProducts}
              isTopRated={index < 3}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
