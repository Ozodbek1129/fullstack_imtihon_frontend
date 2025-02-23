"use client";
import { useState } from "react";
import { useUpdateProductMutation } from "@/redux/apiSlice";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

export default function EditProductModal({ open, handleClose, product }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category_id: product?.category_id || "",
    quantity: product?.quantity || "",
  });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      category_id: Number(formData.category_id),
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    };

    console.log("PATCH yuborilayotgan ma'lumot:", updatedProduct);

    try {
      await updateProduct({ id: product.id, ...updatedProduct }).unwrap();
      handleClose();
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>Mahsulotni Tahrirlash</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Nomi" name="name" value={formData.name} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Tavsif" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={3} />
          <TextField fullWidth label="Narx" name="price" type="number" value={formData.price} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Kategoriya ID" name="category_id" type="number" value={formData.category_id} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Miqdor" name="quantity" type="number" value={formData.quantity} onChange={handleChange} margin="normal" />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleClose} variant="outlined">Bekor qilish</Button>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
