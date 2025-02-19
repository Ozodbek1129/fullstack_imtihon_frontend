"use client"

import WishlistCard from '@/components/WishlistCard';
import { useGetWishlistQuery } from '@/redux/apiSlice'
import React from 'react'

export default function page() {
    const {data, error, isLoading} = useGetWishlistQuery();
    
    if (!data) return <p>Malumot mavjud emas</p>;
    console.log("data", data);
    if (isLoading) return <p>Loading...</p>;
    if (error) {
      console.log("errormessage", error.message);
      return <p>Error: {error.message}</p>;
    }
  return (
    <div className='flex flex-col gap-10'>
        <div className='text-center'>
            <h2 className='text-5xl bg-orange-500 text-white py-10'>Siz yoqtirgan mahsulotlar</h2>
        </div>
        <div className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:justify-center gap-5 px-5'>
            {data.map((e, index)=>(
                <WishlistCard data={e} key={e.id || index}/>
            ))}
        </div>
    </div>
  )
}
