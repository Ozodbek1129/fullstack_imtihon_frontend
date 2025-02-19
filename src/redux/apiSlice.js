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
      query: () => `/products`,
    }),
    updateLike: builder.mutation({
      query: ({ id, is_like }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: { is_like },
        headers:{
          "Content-Type": "application/json",
        }
      }),
    }),
    getCategories: builder.query({
      query: (id) => `/categories/${id}`,
    }),
    getUser: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    getWishlist: builder.query({
      query: () => `/wishlist?user_id=${1}`,
    }),
    addWishlist: builder.mutation({
      query: ({ user_id, product_id }) => ({
        url: "/wishlist",
        method: "POST",
        body: { user_id, product_id },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    
    deleteWishlist: builder.mutation({
      query: (product_id) => ({
        url: `/wishlist/${product_id}`,
        method: "DELETE",
      }),
    }),
    
  }),
});

export const {
  useGetProductsQuery,
  useUpdateLikeMutation,
  useGetUserQuery,
  useGetUserByIdQuery,
  useLoginMutation,
  useGetCategoriesQuery,
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetWishlistQuery,
} = apiSlice;
