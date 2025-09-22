"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import {fixImageUrl} from "@/ulits/fixImageurl"
import Image from "next/image";
import axios from "axios";
import { libraryRoutes } from "@/routes";
import defaultBook from "../../assets/default-book.jpg";
import Loader from "../Loader/Loader";
interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  imageUrl?: string | null;
}

const TopSellers = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewBooks = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetAllBooks`,
          {
            params: {
              pageNumber: 1, 
              pageSize: 10,  
            },
          }
        );

        console.log("API response (new books):", res.data.data.list);

        let AllBooks: Book[] = [];
        if (typeof res.data?.data?.list === "string") {
          AllBooks = JSON.parse(res.data.data.list);
        } else if (Array.isArray(res.data?.data?.list)) {
          AllBooks = res.data.data.list;
        } else {
          console.warn("ساختار API غیرمنتظره بود");
        }

        setBooks(AllBooks);
      } catch (error) {
        console.error("خطا در گرفتن کتاب‌های جدید:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewBooks();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center">
      <Loader/>
    </div>;
  }

  return (
    <div className="mt-16 max-w-7xl mx-auto">
      <h2 className="text-[#653329] text-xl sm:text-2xl font-bold mt-12 mb-6">
        کتاب‌های جدید
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">کتابی یافت نشد</p>
      ) : (
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
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <Link
                href={`${libraryRoutes.detail}/${encodeURIComponent(book.slug)}`}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <div className="w-[180px] h-[300px] rounded-xl overflow-hidden mr-2">
                  <Image
                    src={fixImageUrl(book.imageUrl) ?? defaultBook}
                    alt={book.title}
                    width={200}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#182420] text-sm font-semibold mt-2">
                  {book.title}
                </p>
                <p className="text-[#435f56] text-sm font-semibold">
                  {"نویسنده: "}
                  {book.author}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopSellers;