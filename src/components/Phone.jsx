"use client"
import React from "react";
import MediaCard from "./Card";
import { useGetProductsQuery } from "@/redux/apiSlice";

export default function Phone() {
    
  const {data, error, isLoading} = useGetProductsQuery();
  if (!data) return <p>Malumot mavjud emas</p>;
  console.log("data", data);
  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.log("errormessage", error.message);
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="my-10">
      <div>
        <h2 className="text-3xl pl-5">Telefonlar</h2>
      </div>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:justify-center gap-5 px-5">
        {data?.map((e, index) => (
          <MediaCard data={e} key={e.id || index} />
        ))}
      </div>
    </div>
  );
}
