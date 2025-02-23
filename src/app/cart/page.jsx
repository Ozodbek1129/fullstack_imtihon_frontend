"use client";

import { useGetCartQuery, useRemoveFromCartMutation } from "@/redux/apiSlice";
import { Container, Typography, Button, CircularProgress, Box, Card, CardMedia, CardContent } from "@mui/material";
import Link from "next/link";

export default function CartPage() {
  const { data: cart, isLoading, error } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
console.log("cart", cart);
  const handleRemove = async (id) => {
    await removeFromCart(id);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Xatolik yuz berdi!</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3 }}>
        Savat
      </Typography>

      {cart?.length === 0 ? (
        <Typography variant="h6">Savat bo'sh</Typography>
      ) : (
        cart.map((item) => (
          <Card key={item.id} sx={{ display: "flex", my: 2 }}>
            <CardMedia component="img" sx={{ width: 100 }} image={item.product.image || "/placeholder.png"} alt={item.product.name} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{item.product.name}</Typography>
              <Typography variant="body1">Narx: {item.product.price} so'm</Typography>
              <Typography variant="body2">Miqdor: {item.quantity}</Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
              <Button variant="contained" color="error" onClick={() => handleRemove(item.id)}>
                O'chirish
              </Button>
            </Box>
          </Card>
        ))
      )}

      {cart?.length > 0 && (
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Link href="/checkout">
            <Button variant="contained" color="success">
              Sotib olish
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
}
