import { List } from "@mui/material";
import { useEffect, useState } from "react";

import { Product } from "../types/Product";
import { ProductService } from "../service/ProductService";
import { ProductItem } from "./ProductItem";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const productService = new ProductService();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await productService.getAll();
    setProducts(data);
  };

  return (
    <List>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={loadProducts}
        />
      ))}
    </List>
  );
}
