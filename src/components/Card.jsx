import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useAddWishlistMutation, useDeleteWishlistMutation, useUpdateLikeMutation } from "@/redux/apiSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MediaCard({ data = {} }) {
  console.log("phone", data);
  let { id, name, description, image, is_like } = data;

  const [updateLike] = useUpdateLikeMutation();
const [addwishlist] = useAddWishlistMutation();
const [deleteWishlist] = useDeleteWishlistMutation();
  const [liked, setLiked] = React.useState(is_like);
  const handleLikeClick = async () => {
    try {
      const user_id = 1;
      const newLiked = !liked; 
      setLiked(newLiked);
  
      await updateLike({ id, is_like: newLiked }).unwrap();
  
      if (newLiked) {
        await addwishlist({ user_id, product_id: id });
      } else {
        await deleteWishlist(id ).unwrap();
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setLiked((prev) => !prev);
    }
  };
  

  return (
    <Card sx={{ maxWidth: 250, border: "1px solid #FFA500" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`http://localhost:4000${image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="orange">
          {name}
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
          {description}
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
