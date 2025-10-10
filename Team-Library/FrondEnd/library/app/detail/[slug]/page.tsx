"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import axios from "axios";
import { fixImagePath } from "@/ulits/fixImagePath";
import defaultBook from "../../../assets/default-book.jpg";

interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  description?: string;
  imagePath: string | null;
  imageUrl: string | null;
  rank?: number;
  publicationYear?: number;
  translator?: string;
  categoryName?: string;
  pages?: number;
  price?: number;
  language: string;
  translators: string;
  pdfPath: string;
}

type DetailPageProps = {
  params: Promise<{
    slug: string | string[];
  }>;
};

export default function DetailPage({ params }: DetailPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug[0]
    : resolvedParams.slug;

  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetBySlug`,
          { params: { slug } }
        );

        // const encodedSlug = encodeURIComponent(slug);
        // const res = await axios.get(
        //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetBySlug`,
        //   { params: { slug: encodedSlug } }
        // );
        console.log(res.data.data);
        setBook(res.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  // Fetch related books
  useEffect(() => {
    if (!book) return;

    const fetchRelatedBooks = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetAllBooks`,
          { params: { pageNumber: 1, pageSize: 20 } }
        );
        const allBooks: Book[] = res.data.data.list;
        setRelatedBooks(
          allBooks.filter((b) => b.categoryName === book.categoryName)
        );
      } catch (error) {
        console.error("Error fetching related books:", error);
      }
    };

    fetchRelatedBooks();
  }, [book]);

  // const handleAddToFavorite = () => {
  //   console.log("Added to favorites:", book?.id);
  // };

  // const handleReadBook = () => {
  //   if (!book?.pdfPath) {
  //     alert("فایل PDF موجود نیست");
  //     return;
  //   }
  //   const pdfUrl = fixImagePath(book.pdfPath);
  //   window.open(pdfUrl as string, "_blank");
  // };

  const renderStars = (rank: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rank ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  if (loading || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

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
              <li className="text-gray-800">{book.title}</li>
            </ol>
          </nav>

          {/* Book Detail Section */}
          <div className="bg-[#F0E1DE] rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Book Image */}
              <div className="lg:col-span-1">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={
                      book.imagePath
                        ? (fixImagePath(book.imagePath) as string)
                        : defaultBook
                    }
                    alt={book.title}
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <span className="text-sm text-gray-800">
                      {book.publicationYear}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#435F56]">
                      نویسنده:
                    </span>
                    <span className="text-sm text-gray-800">{book.author}</span>
                  </div>

                  {book.translator && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#435F56]">
                        مترجم
                      </span>
                      <span className="text-sm text-gray-800">
                        {book.translator}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Info */}
              <div className="lg:col-span-2 space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  نویسنده: <span className="text-black">{book.author}</span>
                </p>
                {book.translator && (
                  <p className="text-lg text-gray-600 mb-4">
                    مترجم: <span className="text-black">{book.translator}</span>
                  </p>
                )}

                <div className="prose prose-lg max-w-none">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    درباره کتاب
                  </h3>
                  <p className="text-[#435F56] leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  {/* <Button
                    type="button"
                    label="افزودن به علاقه‌مندی‌ها"
                    widthBtn="w-full sm:w-auto"
                    colorBtn="bg-[#435F56] hover:bg-[#F7F5E9] hover:text-[#435F56] transition-colors duration-200"
                    colorBtnText="text-white"
                    onclick={handleAddToFavorite}
                  /> */}
                  <Button
                    type="button"
                    label="شروع خواندن"
                    widthBtn="w-full sm:w-auto"
                    colorBtn="bg-[#435F56] hover:bg-[#F7F5E9] hover:text-[#435F56] transition-colors duration-200"
                    colorBtnText="text-white"
                    onclick={() => router.push(book.pdfPath)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                کتاب‌های مرتبط
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {relatedBooks.slice(0, 5).map((relatedBook) => (
                  <div
                    key={relatedBook.slug}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(`/detail/${relatedBook.slug}`)}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={
                          relatedBook.imageUrl
                            ? (fixImagePath(relatedBook.imageUrl) as string)
                            : defaultBook
                        }
                        alt={relatedBook.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {relatedBook.title}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {relatedBook.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
