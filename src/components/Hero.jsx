"use client";

import Link from "next/link";
import { useGetAllCategoryQuery } from "@/redux/apiSlice";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import EarbudsOutlinedIcon from "@mui/icons-material/EarbudsOutlined";

const categoryIcons = {
  Telefonlar: <SmartphoneIcon />,
  Kompyuterlar: <ComputerOutlinedIcon />,
  Televizorlar: <TvOutlinedIcon />,
  Quloqchinlar: <HeadphonesOutlinedIcon />,
  Soatlar: <WatchOutlinedIcon />,
  Aksessuarlar: <EarbudsOutlinedIcon />,
};

export default function Hero() {
  const { data: categories, isLoading, error } = useGetAllCategoryQuery();
  if (isLoading) return <p>Kategoriyalar yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi!</p>;

  return (
    <div className="py-10 bg-orange-500 text-white">
      <div className="flex justify-around">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}?name=${category.name}`}
            className="flex flex-col items-center"
          >
            {categoryIcons[category.name.toLowerCase()] || <SmartphoneIcon />}
            <span className="max-[575px]:text-[10px]">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
