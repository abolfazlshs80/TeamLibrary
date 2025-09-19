"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import { IoMdHome, IoMdSearch, IoMdLogIn } from "react-icons/io";
import { libraryRoutes } from "@/routes";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, SetUser] = useState<any>(null);
  const [dropdrownopen , SetDropDownopen]  =  useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
     useEffect(()=>{
       const token = document.cookie.split("; ").find((row)=>
        row.startsWith("token="))?.split("=")[1];
       if (token) {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Account/GetDetailUser`,
          {
            headers: {Authorization: `Bearer ${token}`}
          }
        ).then((res) =>{
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
          }).then((data)=>SetUser(data.data))
          .catch(()=> SetUser(null));
       }
     }, []);
     const handleLogout = ()=> {
       document.cookie = "token=; path=/;";
       SetUser(null);
       window.location.href = "/";
     };
  return (

    <header className="fixed z-20 top-0 left-0  right-0 flex justify-between items-center p-4 bg-white/10 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="logo" width={35} height={35} />
        <p className="flex gap-4 text-[#435F56] text-base font-bold">
          کتابخانه{" "}
        </p>
      </div>
      <nav className="hidden md:block">
        <ul className="flex gap-4 text-[#435F56] text-[14px] font-semibold">
          <li>
            <Link
              className="inline-flex items-center space-x-1"
              href={libraryRoutes.homepage}
            >
              <span>صفحه اصلی</span>
              <IoMdHome size={18} />
            </Link>
          </li>
          <li>
            <Link
              className="inline-flex items-center space-x-1"
              href={libraryRoutes.explore}
            >
              <span>جستجو کتاب</span>
              <IoMdSearch size={18} />
            </Link>
          </li>
          <li>
            <Link href={"/"}>درباره ما</Link>
          </li>
          {!user?(
           <li>
            <Link
              className="inline-flex items-center space-x-1"
              href={libraryRoutes.login}
            >
              <span>ورود/ساخت حساب</span>
              <IoMdLogIn size={18} />
            </Link>
           </li>
          ) : (
            <li className="relative">
              <button onClick={()=>
                SetDropDownopen(!dropdrownopen)} className="inline-flex 
                items-center space-x-1 hover:underline">
                 <span>{user.fullName || "کاربر"}</span>
              </button>
              {dropdrownopen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border">
                  <li>
                    <link href={libraryRoutes.profile} className="block px-4 py-2 text-sm hover:bg-gray-100">
                    پروفایل
                    </link>
                  </li>
                  <li>
                    <button onClick={handleLogout} 
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100">
                       خروج
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}

        </ul>
      </nav>
      <button
        className="md:hidden text-[#435F56] text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="منوی اصلی"
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-white/50 z-10"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-16 left-0 bg-[#435F56] w-64 p-4 rounded-br-md "
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-4 text-[#F7F5E9] text-[14px] font-semibold">
              <li
                className="hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200 "
              >
                <Link
                  href={libraryRoutes.homepage}
                  onClick={() => setIsMenuOpen(false)}
                >
                  صفحه اصلی
                </Link>
              </li>
              <li
                className="hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200 "
              >
                <Link
                  href={libraryRoutes.explore}
                  onClick={() => setIsMenuOpen(false)}
                >
                  جستجو کتاب
                </Link>
              </li>
              <li
                className="hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200 "
              >
                <Link
                  href={libraryRoutes.aboutUs}
                  onClick={() => setIsMenuOpen(false)}
                >
                  درباره ما
                </Link>
              </li>
              <li
                className="hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200"
              >
                <Link
                  href={libraryRoutes.login}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ورود/ساخت حساب
                </Link>
              </li>

            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
