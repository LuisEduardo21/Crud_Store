import { Product } from "@/app/types/Product";
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product;
}

export function EditProductDialog({
  open,
  onClose,
  onSave,
  product,
}: EditProductDialogProps) {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product });
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.image
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setEditedProduct({ ...editedProduct, image: imageUrl });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          {imagePreview && (
            <CardMedia
              component="img"
              height="300"
              image={imagePreview}
              alt="Imagem do produto"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Box>
        <TextField
          margin="dense"
          label="Nome"
          name="name"
          fullWidth
          value={editedProduct.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Descrição"
          name="description"
          fullWidth
          multiline
          rows={3}
          value={editedProduct.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Preço"
          name="price"
          type="number"
          fullWidth
          value={editedProduct.price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => onSave(editedProduct)}
          color="success"
          variant="contained"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
