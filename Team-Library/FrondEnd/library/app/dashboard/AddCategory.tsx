import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface CategoryForm {
  name: string;
  slug: string;
  description: string;
}

interface AddCategoryProps {
  onCategoryAdded: () => void; // برای رفرش لیست دسته‌بندی‌ها
}

const AddCategory: React.FC<AddCategoryProps> = ({ onCategoryAdded }) => {
  const [formCategory, setFormCategory] = useState<CategoryForm>({
    name: "",
    slug: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormCategory({ ...formCategory, [e.target.id]: e.target.value });
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/Create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formCategory),
        }
      );

      const data = await res.json();

      if (!res.ok || data.statusCode !== 200) {
        throw new Error(data.message || "دسته بندی اضافه نشد");
      }

      setSuccessMessage("دسته‌بندی با موفقیت ایجاد شد!");
      setFormCategory({ name: "", slug: "", description: "" }); // ریست فرم

      // کال بک برای رفرش لیست
      if (onCategoryAdded) {
        onCategoryAdded();
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      toast.error(`مشکلی در اضافه کردن دسته بندی رخ داد ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form
        id="category"
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmitCategory}
      >
        <input
          type="text"
          id="name"
          value={formCategory.name}
          onChange={handleChange}
          placeholder="نام دسته‌بندی"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          id="slug"
          value={formCategory.slug}
          onChange={handleChange}
          placeholder="اسلاگ دسته بندی"
          className="border p-2 rounded"
          required
        />
        <textarea
          id="description"
          value={formCategory.description}
          onChange={handleChange}
          placeholder="توضیحات"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
          focus:ring-blue-500 focus:border-transparent resize-y min-h-[120px] max-h-[300px]"
          required
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#914a37] text-white py-2 px-4 rounded hover:bg-[#7a3c2c] transition-colors disabled:opacity-50"
        >
          {loading ? "در حال ارسال..." : "ایجاد دسته بندی"}
        </button>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2 animate-fadeIn">
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCategory;
