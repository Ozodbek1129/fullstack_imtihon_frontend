"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserByIdQuery } from "@/redux/apiSlice";
import Link from "next/link";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ProfilEditModal from "@/components/ProfilEditModal";
export default function Profile() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        router.push("/");
      } else {
        setUserId(storedUserId);
      }
    }
  }, [router]);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !user) return <p>Foydalanuvchi topilmadi</p>;

function handleClick(){
setOpenModal(true);
}

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 shadow-lg bg-white backdrop-blur-sm">
      <div className="border border-orange-500 py-10 px-20 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Profile</h2>
        <div className="flex gap-10">
             <div>
          <img
            src={`http://localhost:4000${user.avatar}`}
            className="w-96 h-96 rounded-md mb-4"
          />
        </div>
        <div>
          <p>
            <strong>Ism:</strong> {user.first_name}
          </p>
          <p>
            <strong>Familiya:</strong> {user.second_name}
          </p>
          <p>
            <strong>Yosh:</strong> {user.age}
          </p>
          <p>
            <strong>Nomer:</strong> {user.phone_number}
          </p>
          <p>
            <strong>Manzil:</strong> {user.address}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Lavozim:</strong> {user.role}
          </p>
          <button onClick={handleClick} className="text-blue-500 my-3 flex items-center"><ModeEditIcon/> Malumotlarni tahrirlash</button>
          <ProfilEditModal isOpen={openModal} onClose={()=>setOpenModal(false)} data={user}/>
        </div>
        </div>
       

        <div className="flex justify-between items-center">
          
          <Link href={"/"} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md">
           {`Asosiy sahifa`}
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              router.push("/");
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Hisobdan chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
