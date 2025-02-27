import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppRoutes } from "../routes/AppRoutes";
import { Product } from "../types/Product";
import { DeleteProductDialog } from "./modals/DeleteProductDialog";
import { EditProductDialog } from "./modals/EditProductDialog";


interface ProductItemProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

export function ProductItem({ product, onDelete, onEdit }: ProductItemProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que o clique propague para o Card
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      {/* 🔹 Componente de Card para Produto */}
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          cursor: "pointer",
          "&:hover": { boxShadow: 6 },
          position: "relative",
        }}
        onClick={() => router.push(AppRoutes.PPRODUCT_DETAILS(product.id))}
      >
        {product.image && (
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
        )}
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary">
            R$ {product.price.toFixed(2)}
          </Typography>
        </CardContent>

        {/* 🔹 Botões de Ação */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            padding: "8px",
          }}
        >
          <IconButton onClick={handleEditClick} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={handleDeleteClick} color="error">
            <Delete />
          </IconButton>
        </div>
      </Card>

      {/* 🔹 Modal de Edição */}
      {isEditDialogOpen && (
        <EditProductDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={(updatedProduct) => {
            onEdit(updatedProduct);
            setIsEditDialogOpen(false);
          }}
          product={product}
        />
      )}

      {/* 🔹 Modal de Exclusão */}
      {isDeleteDialogOpen && (
        <DeleteProductDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            onDelete(product.id);
            setIsDeleteDialogOpen(false);
          }}
          productName={product.name}
        />
      )}
    </>
  );
}
