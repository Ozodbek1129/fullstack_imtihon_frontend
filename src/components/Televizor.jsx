"use client";
import React, { useEffect, useState } from "react";
import MediaCard from "./Card";
import { useGetProductsByCategoryQuery } from "@/redux/apiSlice";

export default function Computers() {
  const id = 4;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const { data, error, isLoading } = useGetProductsByCategoryQuery({
    id,
    page,
  });

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => (page === 1 ? data.products : [...prev, ...data.products]));
    }
  }, [data, page]);

  if (isLoading && page === 1) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error.message}</p>;

  return (
    <div className="my-10">
      <div className="bg-orange-500 py-0.5">
        <h2 className="text-3xl pl-5 my-5 text-white">Televizorlar</h2>
      </div>
      <div className="my-5 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:items-center gap-5 px-5">
        {products.map((e, index) => (
          <MediaCard data={e} key={e.id || `${e.id}-${index}`} />
        ))}
      </div>

      <div className="flex justify-center my-10">
        {data?.totalPages && page < data.totalPages && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            Ko'proq yuklash
          </button>
        )}
      </div>
    </div>
  );
}
