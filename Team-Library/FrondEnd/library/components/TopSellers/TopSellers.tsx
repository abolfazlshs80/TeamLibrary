"use client";

import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { books } from "@/modal/mockData";
import { libraryRoutes } from "@/routes";
import defaultBook from "../../assets/default-book.jpg";

const TopSellers = () => {
  return (
    <div className="mt-16 max-w-7xl mx-auto">
      <h2 className="text-[#653329] text-xl sm:text-2xl font-bold mt-12 mb-6">
        کتاب‌های جدید
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        spaceBetween={5}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          400: { slidesPerView: 1.8 },
          470: { slidesPerView: 2.1 },
          520: { slidesPerView: 2.3 },
          570: { slidesPerView: 2.6 },
          610: { slidesPerView: 2.8 },
          650: { slidesPerView: 3 },
          750: { slidesPerView: 3.2 },
          960: { slidesPerView: 3.5 },
          1100: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
      >
        {books?.map((book) => (
          <SwiperSlide key={book.id}>
            <Link
              href={`${libraryRoutes.detail}/${book.id}`}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <div className="w-[180px] h-[300px] rounded-xl overflow-hidden mr-2">
                <Image
                  src={book.image ?? defaultBook}
                  alt={book.bookName}
                  width={200}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#182420] text-sm font-semibold mt-2">
                {book.bookName}
              </p>
              <p className="text-[#435f56] text-sm font-semibold">
                {"نویسنده:"}
                {book.author}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
