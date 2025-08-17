import { BookCategories } from "@/modal/BookCategories";
import Link from "next/link";
import React from "react";

const Categories = () => {
  return (
    <div className="mt-16 max-w-7xl mx-auto">
      <h4 className="text-[#653329] text-xl sm:text-2xl font-bold mt-12 mb-6">
        دسته بندی کتاب ها بر اساس موضوع
      </h4>

      <div className="flex flex-wrap gap-3">
        {BookCategories.map((category) => (
          <Link
            href={`/category/${category.category}`}
            key={category.id}
            className="border-2 border-[#435F56] px-6 py-2 text-sm font-semibold text-[#435F56] rounded-full hover:bg-[#435F56] hover:text-white transition-colors duration-300 text-center"
          >
            {category.category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
