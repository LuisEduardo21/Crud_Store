import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Product } from "../types/Product";
import { AppRoutes } from "../routes/AppRoutes";

interface Props {
  product: Product;
  onDelete: () => void;
}

export function ProductItem({ product, onDelete }: Props) {
  const router = useRouter();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        cursor: "pointer",
        "&:hover": { boxShadow: 6 },
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
    </Card>
  );
}
