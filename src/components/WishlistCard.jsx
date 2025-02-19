"use client";

import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useUpdateLikeMutation,
} from "@/redux/apiSlice";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function WishlistCard({ data = {} }) {
  const { product } = data;
  const {id, is_like} = product;
  const [updateLike] = useUpdateLikeMutation();
  const [addwishlist] = useAddWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [liked, setLiked] = useState(product.is_like);
  const handleLikeClick = async () => {
    try {
      const user_id = 1;
      const newLiked = !liked;
      setLiked(newLiked);

      await updateLike({ id, is_like: newLiked }).unwrap();

      if (newLiked) {
        await addwishlist({ user_id, product_id: id });
      } else {
        await deleteWishlist(id).unwrap();
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setLiked((prev) => !prev);
    }
  };
  console.log("wish", product);
  return (
    <Card sx={{ maxWidth: 250, border: "1px solid #FFA500" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`http://localhost:4000${product.image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="orange">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            width: "100%",
          }}
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardActions className="flex items-end  gap-5">
        <button className="mt-2 text-red-500" onClick={handleLikeClick}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </button>
        <Link href={"/details"} className="text-black">
          <RemoveRedEyeOutlinedIcon />
        </Link>
        <Link href={"/cart"} className="text-black">
          <ShoppingCartOutlinedIcon />
        </Link>
      </CardActions>
    </Card>
  );
}
