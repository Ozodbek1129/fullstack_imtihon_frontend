"use client"
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from "@mui/icons-material/GitHub";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
export default function Footer() {
    return (
      <footer className="bg-orange-500 text-white py-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Kompaniya</h2>
            <ul className="mt-2 space-y-1">
              <li><a href="/" className="hover:text-gray-400">Biz haqimizda</a></li>
              <li><a href="/" className="hover:text-gray-400">Aloqa</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Foydali havolalar</h2>
            <ul className="mt-2 space-y-1">
              <li><a href="/" className="hover:text-gray-400">Foydalanish shartlari</a></li>
              <li><a href="/" className="hover:text-gray-400">Maxfiylik siyosati</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Ijtimoiy tarmoqlar</h2>
            <ul className="mt-2 space-y-1">
              <li><a href="https://facebook.com" className="hover:text-gray-400"><FacebookOutlinedIcon/></a></li>
              <li><a href="https://github.com/Ozodbek1129" className="hover:text-gray-400"><GitHubIcon/></a></li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-6 text-white">&copy; {new Date().getFullYear()} Barcha huquqlar himoyalangan | Ozodbek</p>
      </footer>
    );
  }
  