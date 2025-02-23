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
      query: () => `/products?limit=100`,
    }),
    updateLike: builder.mutation({
      query: ({ id, is_like }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: { is_like },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getCategories: builder.query({
      query: (id) => `/categories/${id}/products`,
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
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
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
    getProductsByCategory: builder.query({
      query: ({ id, page = 1, limit = 8 }) =>
        `/products/category/${id}?page=${page}&limit=${limit}`,
    }),
    getAllCategory: builder.query({
      query: ()=> "/categories"
    }),
    getOneProduct: builder.query({
      query: (id)=> `/products/${id}`
    }),
    getAllProduct: builder.query({
      query: ()=> `/products/getAll`
    }),
    updateProduct: builder.mutation({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    addToCart: builder.mutation({
      query: (product) => ({
        url: "/cart",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Cart"],
    }),
  
    getCart: builder.query({
      query: () => 'cart',
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useAddToCartMutation,
  useRegisterMutation,
  useGetAllCategoryQuery,
  useGetOneProductQuery,
  useGetProductsQuery,
  useUpdateLikeMutation,
  useGetUserQuery,
  useGetUserByIdQuery,
  useLoginMutation,
  useGetCategoriesQuery,
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetWishlistQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProductsByCategoryQuery,
  useGetAllProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSlice;
