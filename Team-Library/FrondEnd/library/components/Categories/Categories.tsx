"use client";
import React, { useEffect, useState } from "react";
import { libraryRoutes } from "@/routes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BeatLoader } from "react-spinners";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/GetAllCategory?PageNumber=1&PageSize=100`
        );
        let categoryList: Category[] = [];
        categoryList = res.data.data.list;
        console.log("categoryList نهایی:", categoryList);
        setCategories(categoryList);
      } catch (error) {
        console.error("خطا در گرفتن دسته‌بندی‌ها:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center mt-6">در حال بارگذاری دسته‌بندی‌ها...</p>;
  }

  return (
    <div className="mt-16 max-w-7xl mx-auto mb-16">
      <h4 className="text-[#653329] text-xl sm:text-2xl font-bold mt-12 mb-6">
        دسته‌بندی کتاب‌ها بر اساس موضوع
      </h4>

      {loading ? (
        <div className="flex items-center justify-center">
          <BeatLoader color="#d4b091" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                router.push(libraryRoutes.explore);
                localStorage.setItem("selectedCategory", category.name);
                localStorage.setItem(
                  "selectedCategoryId",
                  category.id.toString()
                );
              }}
              className="border-2 cursor-pointer border-[#435F56] px-6 py-2 text-sm font-semibold text-[#435F56] rounded-full hover:bg-[#435F56] hover:text-white transition-colors duration-300 text-center"
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
