import Image from "next/image";
import { libraryRoutes } from "@/routes";
import { BiSolidError } from "react-icons/bi";
import bookBanner from "../assets/banner2.svg";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen">
      {/* Image Background*/}
      <Image
        src={bookBanner}
        alt="book banner"
        fill
        className="object-cover"
        priority
      />

      {/* Text on Image BG*/}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="flex items-center gap-2 text-6xl font-bold text-red-600">
          404 <BiSolidError size={48} />
        </h1>
        <p className="text-lg text-[#435F56] mt-4">
          صفحه مورد نظر یافت نشد
        </p>
        <a
          href={libraryRoutes.homepage}
          className="mt-6 px-6 py-2 bg-[#435F56] text-white rounded hover:bg-[#435A56] transition"
        >
          بازگشت به صفحه اصلی
        </a>
      </div>
    </div>
  );
}