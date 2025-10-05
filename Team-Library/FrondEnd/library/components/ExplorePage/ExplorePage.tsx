"use client";
import React, { useEffect, useState } from "react";
import { BookOpen, Globe, SearchIcon, Star } from "lucide-react";
import { LibraryBig } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { libraryRoutes } from "@/routes";
import defaultBook from "../../assets/default-book.jpg";
import axios from "axios";
import { BeatLoader } from "react-spinners";

interface Books {
  id: number;
  title: string;
  author: string;
  slug: string;
  categoryName: string;
  imageUrl: string;
  rank: number;
}
interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  value: string;
}
const ExplorePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [rank, setRank] = useState("");
  const [language, setLanguage] = useState("");
  const [pages, setPages] = useState("");
  const [books, setBooks] = useState<Books[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookCategory, setBookCategory] = useState<Category[]>([]);

  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      setCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    if (category) {
      localStorage.setItem("selectedCategory", category);
    }
  }, [category]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetAllBooks?PageNumber=1&PageSize=100`
        );
        setBooks(res.data.data.list);
        console.log("Fetched books:", res.data);
      } catch (error) {
        console.error("Fetching books failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/GetAllCategory?PageNumber=1&PageSize=100`
        );
        let categoryList: Category[] = [];
        categoryList = res.data.data.list;
        console.log("categoryList نهایی:", categoryList);
        setBookCategory(categoryList);
      } catch (error) {
        console.error("خطا در گرفتن دسته‌بندی‌ها:", error);
        setBookCategory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category === "" || book.categoryName === category;

    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="pt-6 px-4 mt-9 mx-auto">
      <div className="mt-16 max-w-7xl mx-auto">
        <h4 className="text-[#653329] text-xl sm:text-2xl font-bold mt-12 mb-6">
          جستجو کتاب
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
          <div className="relative w-full">
            <label className="text-[#777574] text-sm pr-3 font-medium">
              جستجو کتاب
            </label>
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm px-10 mt-1  h-10 rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            />
            <SearchIcon
              className="absolute right-4 top-[40px]"
              color="#a8a7a6"
              size={18}
            />
          </div>
          {/* ===================== */}
          <div className="relative w-full flex flex-col mt-1">
            <label className="text-[#777574] text-sm pr-3 font-medium">
              رنک کتاب
            </label>
            <select
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full text-sm px-8 pt-1 mt-1 h-10 text-[#838382] rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            >
              {["1", "2", "3", "4", "5"].map((cat, index) => (
                <option
                  key={index}
                  value={cat}
                  className="text-[#838382] hover:bg-gray-200"
                >
                  {cat}
                </option>
              ))}
            </select>
            <Star
              className="absolute right-3 top-[35px]"
              color="#a8a7a6"
              size={18}
            />
          </div>
          {/* ===================== */}
          <div className="relative w-full flex flex-col mt-1">
            <label className="text-[#777574] text-sm pr-3 font-medium">
              تعداد صفحات کتاب
            </label>
            <select
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full text-sm px-8 mt-1 h-10 text-[#838382] rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            >
              <option
                value={"100"}
                className="text-[#838382] hover:bg-gray-200"
              >
                کمتر از 100 صفحه
              </option>
              <option
                value={"200"}
                className="text-[#838382] hover:bg-gray-200"
              >
                بین 100 تا 200 صفحه
              </option>
              <option
                value={"300"}
                className="text-[#838382] hover:bg-gray-200"
              >
                بین 200 تا 300 صفحه
              </option>
              <option
                value={"400"}
                className="text-[#838382] hover:bg-gray-200"
              >
                بین 300 تا 400 صفحه
              </option>
              <option
                value={"500"}
                className="text-[#838382] hover:bg-gray-200"
              >
                بین 400 تا 500 صفحه
              </option>
              <option
                value={"1000"}
                className="text-[#838382] hover:bg-gray-200"
              >
                بیشتر از 500 صفحه
              </option>
            </select>
            <BookOpen
              className="absolute right-3 top-[35px]"
              color="#a8a7a6"
              size={18}
            />
          </div>
          {/* ===================== */}
          <div className="relative w-full flex flex-col mt-1">
            <label className="text-[#777574] text-sm pr-3 font-medium">
              زبان کتاب
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full text-sm px-8 mt-1 h-10 text-[#838382] rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            >
              {["فارسی", "انگلیسی", "فرانسوی", "عربی"].map((lang, index) => (
                <option
                  key={index}
                  value={lang}
                  className="text-[#838382] hover:bg-gray-200"
                >
                  {lang}
                </option>
              ))}
            </select>
            <Globe
              className="absolute right-3 top-[35px]"
              color="#a8a7a6"
              size={18}
            />
          </div>
          {/* ===================== */}
          <div className="relative w-full flex flex-col mt-1">
            <label className="text-[#777574] text-sm pr-3 font-medium">
              دسته‌بندی کتاب
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm px-8 mt-1 h-10 text-[#838382] rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            >
              <option value={""} className="text-[#838382] hover:bg-gray-200">
                همه دسته‌بندی‌ها
              </option>
              {bookCategory.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.value}
                  className="text-[#838382] hover:bg-gray-200"
                >
                  {cat.name}
                </option>
              ))}
            </select>
            <LibraryBig
              className="absolute right-3 top-[35px]"
              color="#a8a7a6"
              size={18}
            />
          </div>
        </div>

        {/* =========================== */}

        <div>
          {loading ? (
            <div className="flex items-center justify-center mt-16">
              <BeatLoader color="#d4b091" />
            </div>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">کتابی یافت نشد.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() =>
                    router.push(`${libraryRoutes.detail}/${book.slug}`)
                  }
                  className="border cursor-pointer p-2 rounded-lg flex flex-col items-center hover:shadow-lg hover:scale-[1.02]  transition-all duration-300"
                >
                  <Image
                    src={book.imageUrl ?? defaultBook}
                    alt={book.title}
                    className=" h-48 w-40 object-cover mb-2 rounded"
                    width={200}
                    height={300}
                  />

                  <h3 className="text-sm font-semibold">{book.title}</h3>
                  <p className="text-xs text-gray-600">{book.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
