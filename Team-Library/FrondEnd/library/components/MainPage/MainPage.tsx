"use client";
import Image from "next/image";
import React from "react";
import bookBanner from "../../assets/banner2.svg";
import TopRankBooks from "../TopRankBooks/TopRankBooks";
import TopSellers from "../TopSellers/TopSellers";
import Categories from "../Categories/Categories";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { libraryRoutes } from "@/routes";

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   description?: string;
// }

const MainPage = () => {
  const router = useRouter();

  return (
    <div className="pt-6 mt-9 mx-auto">
      {/* ====================header section==================== */}
      <div className="relative sm:mt-0">
        <div className="w-full h-auto relative">
          <Image
            src={bookBanner}
            alt="book banner"
            layout="responsive"
            width={1200}
            height={600}
            objectFit="cover"
          />

          <div className="absolute pt-8 sm:pt-3 inset-0 flex flex-col items-center justify-center text-center p-4">
            <p className="font-semibold text-[4vw] md:text-[2em] text-[#435f56]">
              سامانه
            </p>
            <p className="font-semibold text-[4vw] md:text-[2em] text-[#653329]">
              مدیریت کتابخانه
            </p>

            <p className="text-[#653329] my-1 sm:mt-4 text-[2vw] md:text-[1.3vw] max-w-[38%] md:max-w-[34%] mx-auto">
              در این سامانه می‌توانید کتاب‌ها، نویسندگان و ناشران را مشاهده
              کنید، کتاب‌ها را جستجو کرده و به اطلاعات مورد نیاز خود دسترسی پیدا
              کنید.
            </p>

            <Button
              type="button"
              label="جستجو کتاب"
              widthBtn="w-full sm:w-auto"
              colorBtn="bg-[#435F56] hover:border-[#435F56] text-[2vw] sm:text-[1.5vw] px-8 py-1 hover:bg-[#F7F5E9] hover:text-[#435F56] transition-colors duration-200"
              colorBtnText="text-white"
              onclick={() => {
                router.push(libraryRoutes.explore);
                localStorage.setItem("selectedCategory", "");
              }}
            />
          </div>
        </div>
      </div>

      {/* ====================top books section==================== */}

      <TopRankBooks />
      <TopSellers />
      <Categories />
    </div>
  );
};

export default MainPage;
