"use client"
import React from 'react'
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {

  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    login(username || "کاربر");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F7F5E9] pt-20 pb-10 px-4">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#435F56]">
          ایجاد حساب کاربری
        </h1>
        
        <form className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#653329] mb-2">
              نام کامل
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
            />
          </div>

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#653329] mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="یک نام کاربری انتخاب کنید"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#653329] mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#653329] mb-2">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="آدرس ایمیل خود را وارد کنید"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleLogin}
            type="button"
            className="w-full bg-[#435F56] text-white py-2 px-4 rounded-md hover:bg-[#653329] transition-colors duration-200 font-medium"
          >
            ایجاد حساب
          </button>
        </form>

        <p className="text-center text-sm text-[#653329c0] mt-6">
          با ایجاد حساب، با شرایط و ضوابط موافقت می‌کنید.
        </p>
      </div>
    </div>
  )
}

export default SignupPage
