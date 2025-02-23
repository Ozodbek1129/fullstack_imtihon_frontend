// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import ComboBox from "./Search";
// import { useEffect, useState } from "react";
// import {  useGetProductsQuery, useGetUserByIdQuery,  } from "@/redux/apiSlice";
// import imageUser from "@/images/images.png";
// import { useRouter } from "next/navigation"; 

// export default function Navbar() {
//   const [userId, setUserId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { data: productsData } = useGetProductsQuery();
//   const router = useRouter(); 

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedUserId = localStorage.getItem("userId");
//       setUserId(storedUserId);
//     }
//   }, []);

//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useGetUserByIdQuery(userId, {
//     skip: !userId,
//   });

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (filteredProducts.length > 0) {
//       router.push(`/product/${filteredProducts[0].id}`);
//     }
//   };

//   const filteredProducts =
//     productsData?.products && Array.isArray(productsData.products)
//       ? productsData.products.filter((product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : [];

//   const nav = [
//     { href: "/yangiliklar", title: "Yangiliklar" },
//     { href: "/biz-haqimizda", title: "Biz haqimizda" },
//     { href: "/aloqa", title: "Aloqa" },
//   ];

//   return (
//     <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//       <div className="flex justify-between items-center max-md:items-start py-3 text-black px-10">
//         <Link href={"/"} className="max-md:items-start">
//           <Image src={"/Logo.svg"} width={200} height={50} alt="logo" />
//         </Link>

//         <div className="flex gap-5 text-orange-500 max-lg:hidden">
//           {nav.map((e, index) => (
//             <Link key={index} href={e.href}>
//               {e.title}
//             </Link>
//           ))}
//         </div>

//         <div className="flex max-md:flex-col-reverse items-end gap-5">
//           <form
//             className="border rounded-lg shadow-md relative flex"
//             onSubmit={handleSearchSubmit}
//           >
//             <ComboBox onSearch={handleSearch} />
//             <button
//               type="submit"
//               className="bg-orange-500 text-white px-4 py-2 rounded-r-lg"
//             >
//               Qidirish
//             </button>

//             {searchTerm && (
//               <div className="absolute top-full left-0 w-full bg-white shadow-lg max-h-60 overflow-y-auto">
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((product, index) => (
//                     <Link
//                       key={product.id || index}
//                       href={`/product/${product.id}`}
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       {product.name}
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="px-4 py-2 text-gray-500">Mahsulot topilmadi</p>
//                 )}
//               </div>
//             )}
//           </form>

//           <div className="flex gap-5 items-center">
//             <Link href={"/wishlist"}>
//               <FavoriteBorderOutlinedIcon />
//             </Link>
//             <Link href={"/cart"}>
//               <ShoppingCartOutlinedIcon />
//             </Link>

//             <div>
//               {isLoading ? (
//                 <p className="text-gray-300">Loading...</p>
//               ) : error || !user ? (
//                 <div className="flex gap-2">
//                   <Link
//                     href="/login"
//                     className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm"
//                   >
//                     Kirish
//                   </Link>
//                   <Link
//                     href="/register"
//                     className="px-4 py-2 bg-orange-500 text-white rounded-md text-[10px] flex items-center"
//                   >
//                     Ro'yxatdan o'tish
//                   </Link>
//                 </div>
//               ) : (
//                 <Link href="/profile">
//                   <Image
//                     src={
//                       user.avatar
//                         ? `http://localhost:4000${user.avatar}`
//                         : imageUser
//                     }
//                     width={40}
//                     height={40}
//                     className="w-10 h-10 rounded-full cursor-pointer"
//                     alt="Profile"
//                   />
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ComboBox from "./Search";
import { useEffect, useState } from "react";
import { useGetProductsQuery, useGetUserByIdQuery } from "@/redux/apiSlice";
import imageUser from "@/images/images.png";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: productsData } = useGetProductsQuery();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredProducts.length > 0) {
      router.push(`/product/${filteredProducts[0]?.id}`);
    }
  };

  const filteredProducts =
    productsData?.products && Array.isArray(productsData.products)
      ? productsData.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const nav = [
    { href: "/yangiliklar", title: "Yangiliklar" },
    { href: "/biz-haqimizda", title: "Biz haqimizda" },
    { href: "/aloqa", title: "Aloqa" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSearchOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center py-3 text-black px-10 max-md:px-5">
        <Link href={"/"}>
          <Image src={"/Logo.svg"} width={200} height={50} alt="logo" />
        </Link>

        <div className="flex gap-5 text-orange-500 max-lg:hidden">
          {nav.map((e, index) => (
            <Link key={index} href={e.href}>
              {e.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <form
            className="border rounded-lg shadow-md relative flex items-center max-md:hidden"
            onSubmit={handleSearchSubmit}
          >
            <ComboBox onSearch={handleSearch} />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-r-lg"
            >
              Qidirish
            </button>
          </form>

          <div className="md:hidden flex justify-center">
            <button
              className="text-gray-600"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
          </div>

          <Link href={"/wishlist"}>
            <FavoriteBorderOutlinedIcon />
          </Link>
          <Link href={"/cart"}>
            <ShoppingCartOutlinedIcon />
          </Link>

          <div>
            {isLoading ? (
              <p className="text-gray-300">Loading...</p>
            ) : error || !user ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm"
                >
                  Kirish
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md text-[10px] flex items-center"
                >
                  Ro'yxatdan o'tish
                </Link>
              </div>
            ) : (
              <Link href="/profile">
                <Image
                  src={
                    user.avatar
                      ? `http://localhost:4000${user.avatar}`
                      : imageUser
                  }
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="Profile"
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="flex justify-center mt-2">
          <form
            className="border rounded-lg shadow-md flex items-center max-w-md"
            onSubmit={handleSearchSubmit}
          >
            <ComboBox onSearch={handleSearch} />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-r-lg"
            >
              Qidirish
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
