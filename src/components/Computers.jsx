"use client";
import React, { useState, useEffect } from "react";
import MediaCard from "./Card";
import { useGetProductsByCategoryQuery } from "@/redux/apiSlice";

export default function Computers() {
  const id = 3;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const { data, error, isLoading } = useGetProductsByCategoryQuery({ id, page });

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => {
        const uniqueProducts = [...prev, ...data.products].reduce((acc, item) => {
          acc.set(item.id, item);
          return acc;
        }, new Map());

        return Array.from(uniqueProducts.values());
      });
    }
  }, [data]);

  if (isLoading && page === 1) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error.message}</p>;

  return (
    <div className="my-10">
      <div className="bg-orange-500 py-0.5">
        <h2 className="text-3xl pl-5 my-5 text-white">Kompyuterlar</h2>
      </div>
      <div className="my-5 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:justify-center gap-5 px-5">
        {products.map((e) => (
          <MediaCard data={e} key={e.id} />
        ))}
      </div>

      <div className="flex justify-center my-10">
        {data?.totalPages && page < data.totalPages && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            Ko‘proq yuklash
          </button>
        )}
      </div>
    </div>
  );
}
