"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import AddBook from "./AddBook";
import AddCategory from "./AddCategory";
import AllCategory from "./AllCategory";
import {
  FileChartColumnIncreasing,
  FileDiff,
  FilePlus,
  KeyRound,
  LibraryBig,
  Plus,
  Timer,
} from "lucide-react";
import AllBooks from "./AllBooks";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

const Dashboard = () => {
  const { username, logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState(3600);
  const [bookCount, setBookCount] = useState<number | null>(null);
  const [categoryCount, setCategoryCount] = useState<number | null>(null);
  const [viewsCount, setViewsCount] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [isAddBookOn, setIsAddBookOn] = useState(false);
  const [isEditBookOn, setIsEditBookOn] = useState(false);
  const [isAddCategoryOn, setIsAddCategoryOn] = useState(false);
  const [isEditCategoryOn, setIsEditCategoryOn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/GetAllCategory?PageNumber=1&PageSize=100`
      );
      let categoryList: Category[] = [];
      categoryList = res.data.data.list;
      setCategories(categoryList);
    } catch (error) {
      console.error("خطا در گرفتن دسته‌بندی‌ها:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/Delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: categoryId }),
        }
      );

      if (response.ok) {
        setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
        toast.success("دسته‌بندی با موفقیت حذف شد");
      } else {
        toast.error("خطا در حذف دسته‌بندی");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const handleUpadateCategory = async (categoryId: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/Update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: categoryId,
            name: editForm.name,
            slug: editForm.slug,
            description: editForm.description,
          }),
        }
      );

      if (response.ok) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === categoryId ? { ...cat, ...editForm } : cat
          )
        );
        setEditingCategory(null);
        toast.success("دسته‌بندی با موفقیت ویرایش شد");
      } else {
        toast.error("خطا در ویرایش دسته‌بندی");
      }
    } catch (error) {
      console.error("Error Update category:", error);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category.id);
    setEditForm({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditForm({
      name: "",
      slug: "",
      description: "",
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtredCategories = categories.filter((cat) => {
    return cat.name?.toLocaleLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      logout();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, logout]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("loginAccessToken");
      try {
        const bookRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetAllBooks?PageNumber=1&PageSize=10`
        );
        const bookJson = await bookRes.json();
        setBookCount(bookJson.data?.pagination?.totalCount ?? 0);

        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/GetAllCategory`
        );
        const catJson = await catRes.json();
        setCategoryCount(catJson.data?.pagination?.totalCount ?? 0);

        const viewsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/books/stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!viewsRes.ok) {
          console.error("❌ خطای HTTP:", viewsRes.status);
          throw new Error(`خطای HTTP: ${viewsRes.status}`);
        }

        const viewsJson = await viewsRes.json();
        setViewsCount(viewsJson?.data?.totalViews);
      } catch (error) {
        console.error("❌ خطا در گرفتن داده‌ها:", error);
      }
    };

    fetchData();
  }, []);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const isAdmin = username?.toLowerCase() === "admin";

  return (
    <div className="flex bg-[#f7f5e9] text-[#6e7767] mt-12 min-h-screen">
      {/* Sidebar */}
       <aside className="w-16 sm:w-64 bg-[#6e7767] text-[#f7f5e9] p-4 sm:p-6 flex flex-col overflow-y-auto sticky top-0 h-screen">
        <h2 className="text-lg sm:text-xl font-bold mb-8 mt-4 line-clamp-2">
          👤 <span className="hidden sm:inline">{username}</span>
        </h2>

        <nav className="flex flex-col gap-3 sm:gap-4 flex-1">
          {isAdmin ? (
            <>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <Plus />
                <span className="hidden sm:block"> افزودن کتاب</span>
              </a>
              <a
                href="#category"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <FilePlus />
                <span className="hidden sm:block"> افزودن دسته‌بندی</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <LibraryBig />
                <span className="hidden sm:block">مدیریت کتاب‌ها</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <FileDiff />
                <span className="hidden sm:block">مدیریت دسته‌ها</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <FileChartColumnIncreasing />
                <span className="hidden sm:block">گزارش بازدید</span>
              </a>
              <Link
                href="Auth/ForgetPassword"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <KeyRound />
                <span className="hidden sm:block">تغییر رمز عبور</span>
              </Link>
            </>
          ) : (
            <>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <LibraryBig />
                <span className="hidden sm:block"> لیست کتاب‌ها</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <FileDiff />
                <span className="hidden sm:block"> لیست دسته‌ها</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#5a6252] transition-colors"
              >
                <FileChartColumnIncreasing />
                <span className="hidden sm:block">گزارش بازدید</span>
              </a>
            </>
          )}
        </nav>

        <div className="mt-auto pt-4 border-t border-[#5a6252]">
          <p className="text-xs sm:text-sm flex items-center gap-2">
            <Timer />
            <span className="hidden sm:inline">زمان باقی‌مانده:</span>
          </p>
          <p className="font-bold text-sm sm:text-base mt-1">
            {formatTime(timeLeft)}
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-2 py-10 sm:p-10 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#914a37]">
          {isAdmin ? "📊 پنل مدیریت ادمین" : "📊 پنل کاربری"}
        </h1>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow px-1 py-6 pb-4 lg:p-6 text-center">
            <h4 className="text-sm md:text-base lg:text-lg font-semibold">
              تعداد کتاب‌
            </h4>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#914a37]">
              {bookCount !== null ? bookCount : "…"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow px-1 py-6 pb-4 sm:p-6 text-center">
            <h4 className="text-sm md:text-base lg:text-lg font-semibold">
              دسته‌بندی‌ها
            </h4>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#914a37]">
              {categoryCount !== null ? categoryCount : "…"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow px-1 py-6 pb-4 sm:p-6 text-center">
            <h4 className="text-sm md:text-base lg:text-lg font-semibold">
              تعداد بازدید
            </h4>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#914a37]">
              {viewsCount !== null ? viewsCount : "…"}
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-10 flex flex-col items-center justify-center w-full gap-6">
            {/* =========add books============== */}
            <div className="bg-white/60 border-2 border-gray-200 rounded-lg shadow-md px-2 sm:px-6 pt-6 pb-2 w-full">
              <div
                onClick={() => setIsAddBookOn(!isAddBookOn)}
                className="cursor-pointer"
              >
                <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-4">
                  ➕ افزودن کتاب جدید
                </h4>
              </div>
              {isAddBookOn && <AddBook />}
            </div>
            {/* =========edit books============== */}
            <div className="bg-white/60 border-2 border-gray-200 rounded-lg shadow-md px-2 sm:px-6 pt-6 pb-2 w-full">
              <div
                onClick={() => setIsEditBookOn(!isEditBookOn)}
                className="cursor-pointer"
              >
                <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-4">
                  ✏️ ویرایش کتاب‌ها
                </h4>
              </div>
              {isEditBookOn && <AllBooks />}
            </div>
            {/* =========add categories============== */}
            <div className="bg-white/60 border-2 border-gray-200 rounded-lg shadow-md px-2 sm:px-6 pt-6 pb-2 w-full">
              <div
                onClick={() => setIsAddCategoryOn(!isAddCategoryOn)}
                className="cursor-pointer"
              >
                <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-4">
                  ➕ افزودن دسته‌بندی جدید
                </h4>
              </div>

              {isAddCategoryOn && (
                <AddCategory onCategoryAdded={fetchCategories} />
              )}
            </div>

            {/* =========all categories============== */}
            <div className="bg-white/60 border-2 border-gray-200 rounded-lg shadow-md px-2 sm:px-6 pt-6 pb-2 w-full">
              <div
                onClick={() => setIsEditCategoryOn(!isEditCategoryOn)}
                className="cursor-pointer"
              >
                <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-4">
                  ✏️ ویرایش دسته‌بندی‌ها
                </h4>
              </div>

              {isEditCategoryOn && (
                <AllCategory
                  categories={categories}
                  filtredCategories={filtredCategories}
                  searchTerm={searchTerm}
                  editingCategory={editingCategory}
                  confirmDelete={confirmDelete}
                  loading={loading}
                  editForm={editForm}
                  onSearchChange={(e) => setSearchTerm(e.target.value)}
                  onEditChange={handleEditChange}
                  onUpdateCategory={handleUpadateCategory}
                  onCancelEditing={cancelEditing}
                  onDeleteCategory={handleDeleteCategory}
                  onCancelDelete={() => setConfirmDelete(null)}
                  onStartEditing={startEditing}
                  onSetConfirmDelete={setConfirmDelete}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
