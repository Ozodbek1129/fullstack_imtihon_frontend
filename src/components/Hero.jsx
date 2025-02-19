import Link from 'next/link'
import React from 'react'
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';
import EarbudsOutlinedIcon from '@mui/icons-material/EarbudsOutlined';
// import { useGetCategoriesQuery } from '@/redux/apiSlice';
export default function Hero() {
    // const {data, error, isLoading} = useGetCategoriesQuery()
    const category = [
        {title: "Telefonlar", href: "/telefonlar", icons: <SmartphoneIcon/>},
        {title: "Kompyuterlar", href: "/kompyuterlar", icons: <ComputerOutlinedIcon/>},
        {title: "Televizorlar", href: "/televizorlar", icons: <TvOutlinedIcon/>},
        {title: "Quloqchinlar", href: "/quloqchinlar", icons: <HeadphonesOutlinedIcon/>},
        {title: "Soatlar", href: "/soatlar", icons: <WatchOutlinedIcon/>},
        {title: "Aksessuarlar", href: "/aksessuarlar", icons: <EarbudsOutlinedIcon/>},
    ]
  return (
    <div className='py-10 bg-orange-500 text-white'>
        <div className='flex justify-around'>
            {category?.map((e, index)=>(
                <Link className='flex flex-col  items-center ' key={index} href={e.href}>{e.icons}<span className='max-[575px]:text-[10px]'>{e.title}</span></Link>
            ))}
        </div>
    </div>
  )
}
