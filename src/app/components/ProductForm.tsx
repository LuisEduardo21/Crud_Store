"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { AppRoutes } from "../routes/AppRoutes";
import { productService } from "../service/ProductService";
import { Product } from "../types/Product";

const schema = yup.object().shape({
  name: yup
    .string()
    .max(30, "O nome deve ter no máximo 30 caracteres")
    .required("Nome é obrigatório"),
  price: yup
    .number()
    .positive("O preço deve ser positivo")
    .required("Preço é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  category: yup.string().required("Categoria é obrigatória"),
  image: yup.string().required("Imagem é obrigatória"),
});

export function ProductForm({
  onProductAdded,
}: {
  onProductAdded: () => void;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // 🎯 2️⃣ Criando o formulário com React Hook Form
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await productService.getCategoriesAll();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setValue("image", reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: Product) => {
    try {
      await productService.create(data);
      setMessage("Produto cadastrado com sucesso! 🎉");
      setError(null);
      setOpen(true);
      onProductAdded();

      setTimeout(() => {
        router.push(AppRoutes.PRODUCTS);
      }, 2000);
    } catch (err) {
      setError(
        "Erro ao cadastrar o produto! ❌" +
          (err instanceof Error ? err.message : "")
      );
      setMessage(null);
      setOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 500,
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight={700}
        color="primary"
      >
        Cadastrar Produto
      </Typography>

      {/* Nome do Produto */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      {/* Categoria */}
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Categoria</InputLabel>
            <Select {...field}>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      {/* Preço */}
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Preço"
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        )}
      />

      {/* Descrição */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Descrição"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      {/* Upload de Imagem */}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ textTransform: "none", borderRadius: "12px", height: "40px" }}
      >
        Escolher Imagem
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Button>

      {/* Preview da Imagem */}
      {watch("image") && (
        <Card sx={{ maxWidth: 300, mx: "auto", position: "relative" }}>
          <CardMedia
            component="img"
            height="180"
            image={watch("image")}
            alt="Preview"
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.5)",
            }}
            onClick={() => setValue("image", "")}
          >
            <DeleteIcon sx={{ color: "white" }} />
          </IconButton>
        </Card>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ borderRadius: "12px", height: "40px", fontWeight: "bold" }}
      >
        Salvar Produto
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        {message ? (
          <Alert severity="success" onClose={() => setOpen(false)}>
            {message}
          </Alert>
        ) : (
          <Alert severity="error" onClose={() => setOpen(false)}>
            {error}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}
