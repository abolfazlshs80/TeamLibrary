"use client";
import React, { useEffect, useState } from "react";
import { BookOpen, BookOpenText, Globe, SearchIcon, Star } from "lucide-react";
import { LibraryBig } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { libraryRoutes } from "@/routes";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Books, Category } from "@/modal/types";

const ExplorePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [rank, setRank] = useState("");
  const [language, setLanguage] = useState("");
  const [pages, setPages] = useState("");
  const [books, setBooks] = useState<Books[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(30);
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetAllBooks?PageNumber=1&PageSize=${pageSize}`
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
  }, [pageSize]);

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
    const matchesRank = rank === "" || book.rank === Number(rank);
    const matchesLanguage = language === "" || book.language === language;

    const matchesPage =
      pages === "" ||
      (() => {
        const pageCount = book.maxPageCount;
        const selectedPage = pages;

        switch (selectedPage) {
          case "99":
            return pageCount <= 99;
          case "199":
            return pageCount <= 199;
          case "299":
            return pageCount <= 299;
          case "399":
            return pageCount <= 399;
          case "499":
            return pageCount <= 499;
          case "10000":
            return pageCount > 500;
          default:
            return true;
        }
      })();

    return (
      matchesSearchTerm &&
      matchesCategory &&
      matchesRank &&
      matchesLanguage &&
      matchesPage
    );
  });

  return (
    <div className="pt-6 px-4 mt-9 mx-auto mb-12">
      <div className="mt-16 max-w-7xl mx-auto">
        <h4 className="text-[#653329] text-xl sm:text-2xl font-bold mt-12 mb-6">
          جستجو کتاب
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 w-full">
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
              <option value={""} className="text-[#838382] hover:bg-gray-200">
                همه
              </option>
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
              تعداد صفحات
            </label>
            <select
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full text-sm px-8 mt-1 h-10 text-[#838382] rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            >
              <option value={""} className="text-[#838382] hover:bg-gray-200">
                همه
              </option>
              <option value={"99"} className="text-[#838382] hover:bg-gray-200">
                کمتر از 100 صفحه
              </option>
              <option
                value={"199"}
                className="text-[#838382] hover:bg-gray-200"
              >
                کمتر از 200 صفحه
              </option>
              <option
                value={"299"}
                className="text-[#838382] hover:bg-gray-200"
              >
                کمتر از 300 صفحه
              </option>
              <option
                value={"399"}
                className="text-[#838382] hover:bg-gray-200"
              >
                کمتر از 400 صفحه
              </option>
              <option
                value={"499"}
                className="text-[#838382] hover:bg-gray-200"
              >
                کمتر از 500 صفحه
              </option>
              <option
                value={"10000"}
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
              <option value={""} className="text-[#838382] hover:bg-gray-200">
                همه
              </option>
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

          {/* ===================== */}
          <div className="relative w-full flex flex-col mt-1">
            <label className="text-[#777574] text-sm pr-3 font-medium">
              تعداد کتاب
            </label>
            <input
              type="number"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-full text-sm pr-10 pl-2 mt-1  h-10 rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            />
            <BookOpenText
              className="absolute right-4 top-[35px]"
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
                  className="border-4 border-gray-200 bg-white/30 shadow-md cursor-pointer p-2 rounded-lg flex flex-col items-center hover:shadow-lg hover:scale-[1.02]  transition-all duration-300"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${book.imageUrl}`}
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
