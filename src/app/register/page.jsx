"use client";
import { useState } from "react";
import { useRegisterMutation } from "@/redux/apiSlice";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    age: "",
    phone_number: "",
    email: "",
    password: "",
    address: "",
  });
const router = useRouter()
  const [register, { isLoading, error }] = useRegisterMutation();
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value, 10) || "" : value, // 📌 `age` ni raqamga o‘tkazish
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();
      setSuccess(true);
      
      localStorage.setItem("userId", response.id);
  
      setFormData({
        first_name: "",
        second_name: "",
        age: "",
        phone_number: "",
        email: "",
        password: "",
        address: "",
      });
    } catch (err) {
      console.error("Register error:", err);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 5,
          p: 3,
          boxShadow: 0,
          borderRadius: 2,
          border: "1px solid #f97316",
        }}
      >
        <Typography variant="h4" gutterBottom color="orange">
          Ro'yxatdan o'tish
        </Typography>
        {success && (
          <Alert severity="success">Ro'yxatdan o'tish muvaffaqiyatli!</Alert>
        )}
        {error && (
          <Alert severity="error">
            {error.data?.message || "Xatolik yuz berdi"}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Ism"
            name="first_name"
            fullWidth
            margin="normal"
            size="small"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Familiya"
            name="second_name"
            fullWidth
            margin="normal"
            size="small"
            value={formData.second_name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Yosh"
            name="age"
            type="number"
            fullWidth
            margin="normal"
            size="small"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <TextField
            label="Telefon raqam"
            name="phone_number"
            fullWidth
            margin="normal"
            size="small"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            size="small"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <TextField
            label="Parol"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            size="small"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <TextField
            label="Manzil"
            name="address"
            fullWidth
            margin="normal"
            size="small"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#f97316",
              color: "white",
              "&:hover": { backgroundColor: "#ea580c" },
            }}
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
