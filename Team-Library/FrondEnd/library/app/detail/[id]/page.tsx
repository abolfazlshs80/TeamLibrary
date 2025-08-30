"use client";

import { use } from "react";
import Image from "next/image";
import { books } from "@/modal/mockData";
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import defaultBook from "../../../assets/default-book.jpg"


interface Book {
  id: number;
  bookName: string;
  image: string;
  author: string;
  description: string;
  year: number;
  rank: number;
}

export default function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const unWrappedParams = use(params);
  const bookId = parseInt(unWrappedParams.id || "1");
  const book = books.find((b) => b.id === bookId) || books[0];

  const handleAddToFavorite = () => {
    // Add to favorites logic
    console.log("Added to favorites:", book.bookName);
  };

  const handleReadBook = () => {
    // Read book logic
    console.log("Reading book:", book.bookName);
  };

  const renderStars = (rank: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rank ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-[#F7F5E9]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button
                  onClick={() => router.push("/")}
                  className="text-gray-800 hover:text-gray-500 transition-colors"
                >
                  خانه
                </button>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-800">{book.bookName}</li>
            </ol>
          </nav>

          {/* Book Detail Section */}
          <div className="bg-[#F0E1DE] rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Book Image */}
              <div className="lg:col-span-1">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={book.image ?? defaultBook}
                    alt={book.bookName}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Book Stats */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#435F56]">
                      رتبه:
                    </span>
                    <div className="flex items-center">
                      {renderStars(book.rank)}
                      <span className="mr-2 text-sm text-gray-800">
                        ({book.rank}/5)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#435F56]">
                      سال انتشار:
                    </span>
                    <span className="text-sm text-gray-800">{book.year}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#435F56]">
                      نویسنده:
                    </span>
                    <span className="text-sm text-gray-800">{book.author}</span>
                  </div>
                </div>
              </div>

              {/* Book Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {book.bookName}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    نوشته: <span className="text-black">{book.author}</span>
                  </p>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    درباره کتاب
                  </h3>
                  <p className="text-[#435F56] leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button
                    type="button"
                    label="افزودن به علاقه‌مندی‌ها"
                    widthBtn="w-full sm:w-auto"
                    colorBtn="bg-[#435F56]  hover:bg-[#F7F5E9] hover:text-[#435F56] transition-colors duration-200"
                    colorBtnText="text-white"
                    onclick={handleAddToFavorite}
                  />

                  <Button
                    type="button"
                    label="شروع خواندن"
                    widthBtn="w-full sm:w-auto"
                    colorBtn="bg-[#435F56]  hover:bg-[#F7F5E9] hover:text-[#435F56] transition-colors duration-200"
                    colorBtnText="text-white"
                    onclick={handleReadBook}
                  />
                </div>

                {/* Additional Information */}
                <div className="border-t border-[#435F56] pt-6 mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    اطلاعات تکمیلی
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-[#435F56]">
                        دسته‌بندی:
                      </span>
                      <span className="mr-2 text-gray-800">
                        {book.category}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-[#435F56]">زبان:</span>
                      <span className="mr-2 text-gray-800">فارسی</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#435F56]">صفحات:</span>
                      <span className="mr-2 text-gray-800">{book.pages}</span>
                    </div>
                    <div>
                      <span className="font-medium text-[#435F56]">قیمت:</span>
                      <span className="mr-2 text-gray-800">{book.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Books Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              کتاب‌های مرتبط
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {books
                .filter((b) => b.id !== book.id)
                .slice(0, 5)
                .map((relatedBook) => (
                  <div
                    key={relatedBook.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(`/detail/${relatedBook.id}`)}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={relatedBook.image ?? defaultBook}
                        alt={relatedBook.bookName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {relatedBook.bookName}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {relatedBook.author}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
