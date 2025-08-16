import Image from "next/image";
import React from "react";
import bookBanner from "../../assets/book.svg";
import Button from "../Button/Button";
import arrow from "../../assets/arrowWhite.svg";
import TopRankBooks from "../TopRankBooks/TopRankBooks";
import TopSellers from "../TopSellers/TopSellers";
const MainPage = () => {
  return (
    <div className="p-2 pt-6 md:p-12 max-w-[1320px] mx-auto">
      {/* ====================header section==================== */}

      <div className="relative mt-12 sm:mt-0 ">
        <Image
          src={bookBanner}
          alt="book banner"
          width={1000}
          height={700}
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-2">
          <p className="font-bold text-base sm:text-3xl md:text-4xl lg:text-5xl  text-[#435f56]  inline text-center">
            سامانه
          </p>
          <p className="font-bold text-base sm:text-3xl md:text-4xl lg:text-5xl text-[#653329]  inline text-center">
            مدیریت کتابخانه
          </p>

          <p className="mt-0 sm:mt-4  text-[#653329] text-xs sm:text-base md:text-lg leading-relaxed pl-4 max-w-[250px] sm:max-w-[350px] mx-auto">
            در این سامانه می‌توانید کتاب‌ها، نویسندگان و ناشران را مشاهده کنید،
            کتاب‌ها را جستجو کرده و به اطلاعات مورد نیاز خود دسترسی پیدا کنید.
          </p>
          <div className="w-full flex justify-center mt-0">
            <Button label="جستجو کتاب" type="button" btnIcon={arrow} />
          </div>
        </div>
      </div>
       {/* ====================top books section==================== */}
       <TopRankBooks/>
       <TopSellers/>
    </div>
  );
};

export default MainPage;
