"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { username, logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState(3600);

  const [bookCount, setBookCount] = useState<number | null>(null);
  const [categoryCount, setCategoryCount] = useState<number | null>(null);

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
      } catch (error) {
        console.error("❌ خطا در گرفتن داده‌ها:", error);
      }
    };

    fetchData();
  }, []);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex bg-[#f7f5e9] text-[#6e7767]">
      <aside className="w-64 bg-[#6e7767] text-[#f7f5e9] p-6 flex flex-col min-h-screen gap-7 justify-center self-center">
        <h2 className="text-xl font-bold mt-15">👤 {username}</h2>
        <nav className="flex flex-col gap-4">
          <a href="#">مدیریت کتاب‌ها</a>
          <a href="#">مدیریت دسته‌ها</a>
          <a href="#">گزارش بازدید</a>
        </nav>
        <div className="mt-auto">
          <p className="text-sm">⏳ زمان باقی‌مانده:</p>
          <p className="font-bold">{formatTime(timeLeft)}</p>
        </div>
      </aside>

      <main className="flex-1 p-10 mt-15">
        <h1 className="text-2xl font-bold mb-6 text-[#914a37]">پنل مدیریتی</h1>
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
            <p className="text-3xl font-bold text-[#914a37]">540</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
