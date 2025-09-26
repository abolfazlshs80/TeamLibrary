"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { BookCategories } from "@/modal/BookCategories";
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

const ExplorePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [books, setBooks] = useState<Books[]>([]);
  const [loading, setLoading] = useState(true);

 
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

        <div className="flex gap-2 w-full">
          <div className="relative w-full">
            <label className="text-[#777574] text-sm pr-3 font-medium">
              جستجو کتاب
            </label>
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 mt-1 pb-2 pt-1 rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            />
            <SearchIcon
              className="absolute right-2 top-[35px]"
              color="#a8a7a6"
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
              className="w-full px-10 mt-1 pb-2 pt-1 text-[#838382] rounded-full border-2 border-[#a8a7a6] ring-0 focus:overflow-hidden focus:border-[#B2685A] outline-0 bg-white "
            >
              {BookCategories.map((category) => (
                <option
                  key={category.id}
                  value={category.value}
                  className="text-[#838382] hover:bg-gray-200"
                >
                  {category.category}
                </option>
              ))}
            </select>
            <LibraryBig
              className="absolute right-3 top-[32px]"
              color="#a8a7a6"
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
