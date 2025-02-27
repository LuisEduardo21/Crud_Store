import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { ProductService } from "../../service/ProductService";
import { useProducts } from "../useProducts";

// 🔹 Criando um mock manualmente
const mockProductService = {
  getCategoriesAll: jest.fn(),
  getPaginationProducts: jest.fn(),
} as jest.Mocked<ProductService>;

describe("useProducts Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve carregar categorias corretamente", async () => {
    mockProductService.getCategoriesAll.mockResolvedValue(
      await Promise.resolve(["Eletrônicos", "Roupas"])
    );

    const { result } = renderHook(() =>
      useProducts(mockProductService, 10, "all", "default")
    );

    await act(async () => {});

    expect(mockProductService.getCategoriesAll).toHaveBeenCalled();
    expect(result.current.categories).toEqual(["Eletrônicos", "Roupas"]);
  });

  it("deve carregar produtos e aplicar filtros corretamente", async () => {
    const mockProducts = [
      { id: 1, name: "Laptop", category: "Eletrônicos", price: 3000 },
      { id: 2, name: "Camiseta", category: "Roupas", price: 50 },
    ];
    mockProductService.getPaginationProducts.mockResolvedValue(
      Promise.resolve(mockProducts)
    );

    const { result } = renderHook(() =>
      useProducts(mockProductService, 10, "Eletrônicos", "low-to-high")
    );

    await act(async () => {});

    expect(mockProductService.getPaginationProducts).toHaveBeenCalledWith(10);
    expect(result.current.products).toEqual([
      { id: 1, name: "Laptop", category: "Eletrônicos", price: 3000 },
    ]);
  });

  it("deve ordenar os produtos pelo preço corretamente", async () => {
    const mockProducts = [
      { id: 1, name: "Laptop", category: "Eletrônicos", price: 3000 },
      { id: 2, name: "Fone de Ouvido", category: "Eletrônicos", price: 100 },
    ];
    mockProductService.getPaginationProducts.mockResolvedValue(
      Promise.resolve(mockProducts)
    );

    const { result } = renderHook(() =>
      useProducts(mockProductService, 10, "Eletrônicos", "low-to-high")
    );

    await act(async () => {});

    expect(result.current.products).toEqual([
      { id: 2, name: "Fone de Ouvido", category: "Eletrônicos", price: 100 },
      { id: 1, name: "Laptop", category: "Eletrônicos", price: 3000 },
    ]);
  });
});
