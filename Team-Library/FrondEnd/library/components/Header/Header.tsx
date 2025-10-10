"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import { IoMdHome, IoMdSearch, IoMdLogIn } from "react-icons/io";
import { libraryRoutes } from "@/routes";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { isLoggedIn, username, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <header className="fixed z-20 top-0 left-0  right-0 flex justify-between items-center p-4 bg-white backdrop-blur-md shadow-sm min-w-full">
      <div
        onClick={() => router.push(libraryRoutes.homepage)}
        className="flex items-center gap-3"
      >
        <Image src={logo} alt="logo" width={35} height={35} />
        <p className="flex gap-4 text-[#435F56] text-base font-bold">
          کتابخانه{" "}
        </p>
      </div>
      <nav className="hidden md:block">
        <ul className="flex gap-8 text-[#435F56] text-[14px] font-semibold w-full">
          <li>
            <Link
              className="inline-flex items-center space-x-1"
              href={libraryRoutes.homepage}
            >
              <IoMdHome size={18} />
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link
              className="inline-flex items-center space-x-1"
              href={libraryRoutes.explore}
            >
              <IoMdSearch size={18} />
              <span>جستجو کتاب</span>
            </Link>
          </li>
          <li>
            <Link href={libraryRoutes.AboutUs}>درباره ما</Link>
          </li>
          {!isLoggedIn ? (
            <li>
              <Link
                href={libraryRoutes.login}
                className="inline-flex items-center space-x-1"
              >
                <IoMdLogIn size={18} />
                <span>ورود/ثبت نام</span>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link href={libraryRoutes.dashboard}>
                  حساب کاربری ({username})
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-[#914a37] font-bold">
                  خروج
                </button>
              </li>
            </>
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
                  onClick={() => {
                    setIsMenuOpen(false);
                    localStorage.setItem("selectedCategory", "");
                  }}
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
              {/* <li
                className="hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200"
              >
                <Link
                  href={libraryRoutes.login}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ورود/ثبت نام
                </Link>
              </li> */}
              {!isLoggedIn ? (
                <li
                  className="hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200"
                >
                  <Link
                    href={libraryRoutes.login}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ورود/ثبت نام
                  </Link>
                </li>
              ) : (
                <>
                  <li
                    className="hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200"
                  >
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      href={libraryRoutes.dashboard}
                    >
                      حساب کاربری ({username})
                    </Link>
                  </li>
                  <li
                    className="hover:bg-[#F7F5E9] text-[#da4848] hover:text-[#5e2a2a] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200"
                  >
                    <button onClick={logout}>خروج</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
