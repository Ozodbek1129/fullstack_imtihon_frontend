import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getCategories: builder.query({
      query: () => "/categories",
    }),
    getUser: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({ 
      query: (id) => `/users/${id}`,
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetEventQuery,
  useGetUserQuery,
  useGetUserByIdQuery,  // ✅ Endpointni export qilish
  useLoginMutation,
} = apiSlice;
