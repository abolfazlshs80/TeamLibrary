import React from "react";
import Image from "next/image";
import Link from "next/link";
import bookPic1 from "@/assets/footer1.svg"; // Adjust the path as necessary
import bookPic2 from "@/assets/footer2.svg"; // Adjust the path as necessary

const Footer = () => {
  return (
      <footer className="bg-[#F0E1DE] py-4 w-full z-[100]">
        <div className="flex justify-center mt-8 gap-16 sm:gap-12 md:gap-32 lg:gap-80">
          <div className="">
            <p className="text-[#653329] font-semibold text-base sm:text-lg ">
              دسترسی سریع
            </p>
            <ul className="flex flex-col gap-2 text-sm sm:text-base text-[#653329c0] mt-3 list-disc items-start justify-center pr-4">
              <li>
                <Link href="/">صفحه اصلی</Link>
              </li>
              <li>
                <Link href="/explore">جستجو کتاب</Link>
              </li>
              <li>
                <Link href="/AboutUs">درباره ما</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[#653329] font-semibold text-base sm:text-lg">
              صفحات کاربردی
            </p>
            <ul className="flex flex-col gap-2 text-sm sm:text-base text-[#653329c0] mt-3 list-disc items-start justify-center pr-4">
              <li>
                <Link
                  href="https://www.goodreads.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  سایت گودریدز
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.ketabrah.ir/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  کتابراه
                </Link>
              </li>

              <li>
                <Link
                  href="https://taaghche.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  طاقچه
                </Link>
              </li>

              <li>
                <Link
                  href="https://fidibo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  فیدیبو
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} کتابخانه. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs mt-2">طراحی و توسعه توسط تیم ...</p>
        </div>
        <div className="relative">
        <Image
          src={bookPic1}
          alt="book pic"
          width={280}
          height={280}
          className="hidden sm:block absolute bottom-4 right-0"
        />
        <Image
          src={bookPic2}
          alt="book pic"
          width={100}
          height={100}
          className="absolute bottom-0 left-0"
        />
        </div>
      </footer>
  );
};

export default Footer;
