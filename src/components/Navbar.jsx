"use client"

import Image from "next/image";
import Link from "next/link";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ComboBox from "./Search";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery, useGetProductsQuery } from "@/redux/apiSlice";

export default function Navbar() {
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv uchun state
  const { data: productsData } = useGetProductsQuery(); // Barcha mahsulotlar

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Qidiruv natijalarini filtrlash
  const filteredProducts = productsData?.products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const nav = [
    { href: "/yangiliklar", title: "Yangiliklar" },
    { href: "/biz-haqimizda", title: "Biz haqimizda" },
    { href: "/aloqa", title: "Aloqa" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center py-3 text-black px-10 shadow-white">
        <Link href={"/"}>
          <Image src={"/Logo.svg"} width={200} height={50} alt="logo" />
        </Link>
        <div className="flex gap-5 text-orange-500 max-lg:hidden">
          {nav.map((e, index) => (
            <Link key={index} href={e.href}>
              {e.title}
            </Link>
          ))}
        </div>
        <div className="border rounded-lg shadow-md relative">
          <ComboBox onSearch={handleSearch} />
          {/* Qidiruv natijalarini chiqarish */}
          {searchTerm && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg max-h-60 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {product.name}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">Mahsulot topilmadi</p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-5 items-center">
          <Link href={"/wishlist"}>
            <FavoriteBorderOutlinedIcon />
          </Link>
          <Link href={"/cart"}>
            <ShoppingCartOutlinedIcon />
          </Link>
          <div>
            {isLoading ? (
              <p className="text-gray-300">Loading...</p>
            ) : error || !user ? (
              <Link href="/login" className="px-4 py-2 bg-orange-500 text-white rounded-md">
                Login
              </Link>
            ) : (
              <Link href="/profile">
                <Image
                  src={user.avatar ? `http://localhost:4000${user.avatar}` : "/default-avatar.png"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="Profile"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
