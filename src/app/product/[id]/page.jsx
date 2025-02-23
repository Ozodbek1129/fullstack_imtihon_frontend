"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetOneProductQuery,
  useUpdateLikeMutation,
} from "@/redux/apiSlice";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import Image from "next/image";

export default function ProductPage() {
  const { id } = useParams(); 
  const { data: product, isLoading, error } = useGetOneProductQuery(id);
console.log("image", product);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (product) {
      setLiked(product.is_like);
    }
  }, [product]);

  const [updateLike] = useUpdateLikeMutation();
  const [addwishlist] = useAddWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

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

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi: {error.message}</p>;
  if (!product) return <p>Mahsulot topilmadi</p>;

  return (
    <div className="flex gap-10 border border-orange-500 rounded-md max-md:flex-col mt-16 my-5 mx-5 py-10 px-5">
      <div>
        <Image src={`http://localhost:4000${product.image}`} width={300} height={300} alt="img"/>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl text-orange-500">{product?.name}</h2>
          <p className="max-w-lg whitespace-normal break-words">{product?.description}</p>

          <p className="text-green-500">Narxi: {product?.price} so'm</p>
          <p>Soni: {product.quantity}</p>
          <p>Ishlab chiqarilgan sana: {product.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-red-500" onClick={handleLikeClick}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </button>
          <Link href="/cart" className="text-black">
            <ShoppingCartOutlinedIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
