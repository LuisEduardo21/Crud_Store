import { Card, CardContent, Typography, Button, CardMedia } from "@mui/material";
import { Product } from "../types/Product";
import { ProductService } from "../service/ProductService";


interface Props {
  product: Product;
  onDelete: () => void;
}

export function ProductItem({ product, onDelete }: Props) {
  const productService = new ProductService();

  const handleDelete = async () => {
    if (product.id) {
      await productService.delete(product.id);
      onDelete();
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      {/* Exibir a Imagem */}
      {product.image && <CardMedia component="img" height="140" image={product.image} alt={product.name} />}
      
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="h6">R$ {product.price.toFixed(2)}</Typography>
        <Button variant="contained" color="secondary" onClick={handleDelete}>Excluir</Button>
      </CardContent>
    </Card>
  );
}