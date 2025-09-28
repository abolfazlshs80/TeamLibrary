"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { username, logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState(3600);

  const [bookCount, setBookCount] = useState<number | null>(null);
  const [categoryCount, setCategoryCount] = useState<number | null>(null);
  const [viewsCount, setViewsCount] = useState<number | null>(null);

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
      try {
        const bookRes = await fetch(
          "http://abolfazl11111.runasp.net/api/Book/GetAllBooks?PageNumber=1&PageSize=10"
        );
        const bookJson = await bookRes.json();
        setBookCount(bookJson.data?.pagination?.totalCount ?? 0);

        const catRes = await fetch(
          "http://abolfazl11111.runasp.net/api/Category/GetAllCategory"
        );
        const catJson = await catRes.json();
        setCategoryCount(catJson.data?.pagination?.totalCount ?? 0);

       /* const viewsRes = await fetch(
          "http://abolfazl11111.runasp.net/api/admin/books/stats",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxMiIsIkFjY2Vzc0xldmVsIjoidXNlclR5cGUiLCJuYmYiOjE3NTg4OTU3MjQsImV4cCI6MTc1ODk4MjEyNCwiaWF0IjoxNzU4ODk1NzI0fQ.URqAxTwFCQBRItXgN63r8ycDaV6Y-v-5-qroHyoCMjU'
            },
          }
        );
        const viewsJson = await viewsRes.json();
        setViewsCount(viewsJson.data?.totalViews ?? 0);*/


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
    <div className="min-h-screen flex bg-[#f7f5e9] text-[#6e7767]">
      <aside className="w-64 bg-[#6e7767] text-[#f7f5e9] p-6 flex flex-col min-h-screen gap-7 justify-center self-center">
        <h2 className="text-xl font-bold mt-15">👤 {username}</h2>
        <nav className="flex flex-col gap-4">
          {isAdmin ? (
            <>
              <a href="#">➕ افزودن کتاب</a>
              <a href="#">➕ افزودن دسته‌بندی</a>
              <a href="#">مدیریت کتاب‌ها</a>
              <a href="#">مدیریت دسته‌ها</a>
              <a href="#">گزارش بازدید</a>
            </>
          ) : (
            <>
              <a href="#">📚 لیست کتاب‌ها</a>
              <a href="#">🏷️ لیست دسته‌ها</a>
              <a href="#">گزارش بازدید</a>
            </>
          )}
        </nav>
        <div className="mt-auto">
          <p className="text-sm">⏳ زمان باقی‌مانده:</p>
          <p className="font-bold">{formatTime(timeLeft)}</p>
        </div>
      </aside>

      <main className="flex-1 p-10 mt-15">
        <h1 className="text-2xl font-bold mb-6 text-[#914a37]">
          {isAdmin ? "📊 پنل مدیریت ادمین" : "📊 پنل کاربری"}
        </h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg font-semibold">📚 تعداد کتاب‌ها</h2>
            <p className="text-3xl font-bold text-[#914a37]">
              {bookCount !== null ? bookCount : "…"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg font-semibold">🏷️ دسته‌بندی‌ها</h2>
            <p className="text-3xl font-bold text-[#914a37]">
              {categoryCount !== null ? categoryCount : "…"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg font-semibold">👀 تعداد بازدید</h2>
            <p className="text-3xl font-bold text-[#914a37]">
              {viewsCount !== null ? viewsCount : "…"}
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">➕ افزودن کتاب جدید</h2>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="نام کتاب"
                  className="border p-2 rounded"
                />
                <button className="bg-[#914a37] text-white py-2 px-4 rounded">
                  ذخیره
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">➕ افزودن دسته‌بندی جدید</h2>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="نام دسته‌بندی"
                  className="border p-2 rounded"
                />
                <button className="bg-[#914a37] text-white py-2 px-4 rounded">
                  ذخیره
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;