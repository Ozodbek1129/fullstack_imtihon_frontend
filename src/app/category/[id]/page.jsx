"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useGetProductsByCategoryQuery } from "@/redux/apiSlice";
import MediaCard from "@/components/Card";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("name");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const { data, error, isLoading } = useGetProductsByCategoryQuery({
    id,
    page,
  });

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products]);
    }
  }, [data]);

console.log("data", data);
  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi!</p>;

  return (
    <div>
      <h1 className="text-3xl text-center py-10 bg-orange-500 text-white font-bold">{categoryName}</h1>
      <div className="grid grid-cols-4 gap-4 my-10 ml-10">
        {products.map((e, index) => (
          <MediaCard data={e} key={e.id || index} />
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
