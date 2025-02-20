"use client";
import React, { useState } from "react";
import MediaCard from "./Card";
import { useGetProductsByCategoryQuery } from "@/redux/apiSlice";

export default function Computers() {
  const id = 1;
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetProductsByCategoryQuery({ id, page });

  if (!data) return <p>Ma'lumot mavjud emas</p>;
  const { products, totalPages } = data;

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error.message}</p>;

  return (
    <div className="my-10">
      <div className="bg-orange-500 py-0.5">
        <h2 className="text-3xl pl-5 my-5 text-white">Telefonlar</h2>
      </div>
      <div className="my-5 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:justify-center gap-5 px-5">
        {products.map((e, index) => (
          <MediaCard data={e} key={e.id || index} />
        ))}
      </div>

      {page < totalPages && (
        <button 
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Ko'proq yuklash
        </button>
      )}
    </div>
  );
}
