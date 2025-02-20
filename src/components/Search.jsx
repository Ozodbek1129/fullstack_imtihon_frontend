"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/redux/apiSlice";

export default function ComboBox({ onSearch }) {
  const { data: categories } = useGetCategoriesQuery();
  const { data: product } = useGetProductsQuery();
  const [search, setSearch] = useState("");

  const handleSearch = (event, value) => {
    setSearch(value);
    if (onSearch) { 
      onSearch(value);
    }
  };

  const products = product?.products || [];
  const options = [
    ...(categories?.map((cat) => cat.name) || []),
    ...(products.map((prod) => prod.name) || []),
  ];

  return (
    <Autocomplete
      freeSolo
      options={options}
      onInputChange={handleSearch}
      sx={{ width: 250 }}
      renderInput={(params) => (
        <TextField {...params} size="small" label="Search products or categories" />
      )}
    />
  );
}
