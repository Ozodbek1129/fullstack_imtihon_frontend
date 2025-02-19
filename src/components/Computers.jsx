"use client"
import React from "react";
import MediaCard from "./Card";
import { useGetCategoriesQuery } from "@/redux/apiSlice";

export default function Computers() {
    const id = 3
  const {data, error, isLoading} = useGetCategoriesQuery(id);
  if (!data) return <p>Malumot mavjud emas</p>;
  const {products} = data;
  console.log("data", data);
  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.log("errormessage", error.message);
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="my-10">
      <div className="bg-orange-500 py-0.5">
        <h2 className="text-3xl pl-5 my-5 text-white">Kompyuterlar</h2>
      </div>
      <div className=" my-5 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:justify-center gap-5 px-5">
        {products?.map((e, index) => (
          <MediaCard data={e} key={e.id || index} />
        ))}
      </div>
    </div>
  );
}
