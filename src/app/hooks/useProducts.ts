import { useEffect, useState } from "react";
import { ProductService } from "../service/ProductService";
import { Product } from "../types/Product";

export function useProducts(
  productService: ProductService,
  limit: number,
  category: string,
  priceOrder: string
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [limit, category, priceOrder]);

  const loadCategories = async () => {
    const data = await productService.getCategoriesAll();
    setCategories(data);
  };

  const filterProducts = (products: Product[] = []): Product[] => {
    let filtered = [...products];

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (priceOrder === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const loadProducts = async () => {
    const data = await productService.getPaginationProducts(limit);
    setProducts(filterProducts(data));
  };

  return { products, categories, loadProducts };
}
