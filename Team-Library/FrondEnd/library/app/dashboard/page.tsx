"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
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
  const [formCategory, setFormCategory] = useState({
    name:"",
    slug:"",
    description:""
  })
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormCategory({ ...formCategory, [e.target.id]: e.target.value });
    };

  const handelsubmitCategory = async(e: React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    try{
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/Create`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formCategory),
          }
        );
        setSuccessMessage('دسته‌بندی با موفقیت ایجاد شد!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
        const data = await res.json();

        if (!res.ok || data.statusCode !== 200) {
          throw new Error(data.message || "دسته بندی  اضافه نشد"  );
        }
        
    }catch(error){
      toast.error( "  مشکلی در اضافه کردن دسته بندی رخ داد ");
    }finally{
      setLoading(false);
    }      
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/GetAllCategory?PageNumber=1&PageSize=100`);
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

    fetchCategories();
  }, []);
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetAllBooks?PageNumber=1&PageSize=10`
        );
        const bookJson = await bookRes.json();
        setBookCount(bookJson.data?.pagination?.totalCount ?? 0);

        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/GetAllCategory`
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
   useEffect(()=>{


 })
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
              <form className="flex flex-col gap-4" onSubmit={handelsubmitCategory}>
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
                  placeholder=" اسلاگ دسته بندی"
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
                className="bg-[#914a37] text-white py-2 px-4 rounded">
                {loading ? "در حال ارسال..." : "ایجاد دسته بندی"}
                </button>
                {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2 animate-fadeIn">
                <span className="block sm:inline"> {successMessage}</span>
                </div>
                 )}
              </form>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
             <h2 className="text-lg font-semibold mb-4">نمایش و حذف دسته بندی</h2>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {categories.map((cat) => (
      <div
        key={cat.id}
        className="border-2 cursor-pointer border-[#ebc2a1] p-3
        rounded-md hover:bg-[#f3dac6] hover:text-white 
        transition-colors duration-300 min-h-[80px]
        flex flex-col justify-center"
      >
        
        <div className="mb-2">
          <div className="text-gray-600 text-xs mb-1">نام:</div>
          <div className="text-[#cc0e0e] font-bold text-sm break-words line-clamp-2 ">
            {cat.name}
          </div>
        </div>
        
       
        <div>
          <div className="text-gray-600 text-xs mb-1">اسلاگ:</div>
          <div className="text-[#cc0e0e] font-bold text-sm break-words line-clamp-2">
            {cat.slug}
          </div>
        </div>
      </div>
    ))}
             </div>
           </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;