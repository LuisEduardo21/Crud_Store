import axios, { AxiosResponse } from "axios";
import { Product } from "../types/Product";

const API_URL = "https://fakestoreapi.com/products";

export class ProductService {
  async create(product: Product): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await axios.post<Product>(
        API_URL,
        product
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw new Error("Erro ao criar produto");
    }
  }

  async getAll(): Promise<Product[]> {
    try {
      const response: AxiosResponse<Product[]> = await axios.get<Product[]>(
        API_URL
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw new Error("Erro ao buscar produtos");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw new Error("Erro ao deletar produto");
    }
  }

  async getCategoriesAll(): Promise<string[]> {
    try {
      const response: AxiosResponse<string[]> = await axios.get<string[]>(
        `${API_URL}/categories`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw new Error("Erro ao buscar categorias");
    }
  }
}

export const productService = new ProductService();
