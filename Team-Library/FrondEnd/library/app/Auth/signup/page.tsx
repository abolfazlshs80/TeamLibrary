"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Account/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok || data.statusCode !== 200) {
        throw new Error(data.message || "ثبت‌نام ناموفق بود");
      }

      const tokenSignup = data?.data?.accessToken;
      const expiresAt = data?.data?.expiresAt;

      if (tokenSignup) {
        const expiryDate = new Date(expiresAt);
        const now = new Date();
        const maxAgeSeconds = Math.floor(
          (expiryDate.getTime() - now.getTime()) / 1000
        );

        Cookies.set("accessToken", tokenSignup, {
          expires: maxAgeSeconds / 86400, // تبدیل ثانیه به روز
          path: "/",
        });

        toast.success("ثبت‌نام موفق! در حال هدایت به داشبورد...");
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        toast("ثبت‌نام موفق شد ولی توکن دریافت نشد");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "مشکلی در ثبت‌نام رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5E9] pt-20 pb-10 px-4">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#435F56]">
          ایجاد حساب کاربری
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#653329] mb-2"
            >
              نام کامل
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-[#653329] mb-2"
            >
              نام کاربری
            </label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="یک نام کاربری انتخاب کنید"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#653329] mb-2"
            >
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="رمز عبور خود را وارد کنید"
              required
              minLength={8}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#653329] mb-2"
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="آدرس ایمیل خود را وارد کنید"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#435F56] text-white py-2 px-4 rounded-md hover:bg-[#653329] transition-colors duration-200 font-medium"
          >
            {loading ? "در حال ارسال..." : "ایجاد حساب"}
          </button>
        </form>

        <p className="text-center text-sm text-[#653329c0] mt-6">
          با ایجاد حساب، با شرایط و ضوابط موافقت می‌کنید.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
