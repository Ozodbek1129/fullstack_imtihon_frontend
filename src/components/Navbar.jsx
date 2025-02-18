import Image from "next/image";
import Link from "next/link";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ComboBox from "./Search";
export default function Navbar() {
  const nav = [
    { href: "/yangiliklar", title: "Yangiliklar" },
    { href: "/biz-haqimizda", title: "Biz haimizda" },
    { href: "/aloqa", title: "Aloqa" },
  ];
  return (
    <div className="flex justify-between items-center py-3 text-black px-10 shadow-white ">
      <div>
        <Image src={"/Logo.svg"} width={200} height={50} alt="logo" />
      </div>
      <div className="flex gap-5 text-orange-500 max-lg:hidden">
        {nav &&
          nav.map((e, index) => (
            <Link key={index} href={e.href}>
              {e.title}
            </Link>
          ))}
      </div>
      <div className="border rounded-lg shadow-md">
        <ComboBox/>
      </div>
      <div className="flex gap-5 items-center">
        <Link href={"/wishlist"}><FavoriteBorderOutlinedIcon/></Link>
        <Link href={"/cart"}><ShoppingCartOutlinedIcon/></Link>
        <button>dark</button>
        <Link className="border py-2 px-4 rounded-md bg-orange-500 text-white" href={"/"}>Login</Link>
      </div>
    </div>
  );
}
