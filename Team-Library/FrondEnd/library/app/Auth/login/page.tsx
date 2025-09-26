<<<<<<< HEAD
"use client"
import Link from 'next/link'
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#F7F5E9] pt-20 pb-10 px-4">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#435F56]">
          ورود به حساب کاربری
        </h1>
        
        <form className="space-y-4">

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#653329] mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
              placeholder="نام کاربری خود را وارد کنید"
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

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-[#435F56] text-white py-2 rounded-md hover:bg-[#365048]"
          >
            ورود
          </button>
        </form>

        <p className="text-center text-sm text-[#653329c0] mt-6">
            حساب کاربری ندارید؟ <Link href="/Auth/signup" className='underline text-[#25463c]'>ثبت نام</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
=======
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/APIs/axiosInstance";
import { libraryRoutes } from "@/routes";
import axios, { AxiosError } from "axios";

interface LoginResponse {
  data: {
    expireDate: string;
    token: string;
  };
}

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 دقیقه

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const lockUntil = localStorage.getItem("lockUntil");
    if (lockUntil) {
      const now = Date.now();
      if (now < Number(lockUntil)) {
        setLocked(true);
        updateRemainingTime(Number(lockUntil) - now);
      } else {
        localStorage.removeItem("lockUntil");
        localStorage.removeItem("failedAttempts");
      }
    }
  }, []);

  const updateRemainingTime = (ms: number) => {
  setRemainingTime(Math.ceil(ms / 1000));
  const interval = setInterval(() => {
    const lockUntil = Number(localStorage.getItem("lockUntil"));
    if (!lockUntil) {
      clearInterval(interval);
      return;
    }
    const now = Date.now();
    if (now >= lockUntil) {
      setLocked(false);
      localStorage.removeItem("lockUntil");
      localStorage.removeItem("failedAttempts");
      setMessage(""); 
      clearInterval(interval);
    } else {
      setRemainingTime(Math.ceil((lockUntil - now) / 1000));
    }
  }, 1000);
};


  const handleLogin = async () => {
    if (locked) {
      // alert("ورود به مدت ۱۵ دقیقه قفل شده است.");
      setMessage("ورود به مدت ۱۵ دقیقه قفل شده است.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post<LoginResponse>("/api/Account/Login", {
        userName,
        password,
      });

      const expiresAt = response.data.data.expireDate;
      const accessToken = response.data.data.token;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("expiresAt", expiresAt);
      localStorage.setItem("userName", userName);

      // موفقیت → ریست تلاش‌ها
      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("lockUntil");

      router.push(libraryRoutes.homepage);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<{ message?: string }>;
        console.log(serverError.response?.data?.message);
        setMessage("نام کاربری یا رمز اشتباه است");

        // شمارش تلاش‌های ناموفق
        let attempts = Number(localStorage.getItem("failedAttempts") || "0");
        attempts += 1;
        localStorage.setItem("failedAttempts", attempts.toString());

        if (attempts >= MAX_ATTEMPTS) {
          const lockUntil = Date.now() + LOCK_TIME;
          localStorage.setItem("lockUntil", lockUntil.toString());
          setLocked(true);
          updateRemainingTime(LOCK_TIME);
          setMessage("۵ بار اشتباه وارد شد. ورود به مدت ۱۵ دقیقه قفل شد.");
        }
      } else {
        alert("یک خطای غیرمنتظره رخ داد");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5E9] pt-28 pb-4 px-4">
      <div className="max-w-md mx-auto border-4 border-white bg-white/50 backdrop-blur-md rounded-lg shadow-lg p-6 mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#435F56]">
          ورود به حساب کاربری
        </h1>

        {locked ? (
          <p className="text-center text-red-600 font-semibold">
            ورود قفل شده است. لطفا {Math.ceil(remainingTime / 60)} دقیقه دیگر
            تلاش کنید.
          </p>
        ) : (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#653329] mb-2"
              >
                نام کاربری
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
                placeholder="نام کاربری خود را وارد کنید"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50"
                placeholder="رمز عبور خود را وارد کنید"
              />
            </div>

            {message && (
              <div className="border-red-50 py-2 px-3 border-2 w-full shadow-md text-sm sm:text-base text-red-600">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className="w-full bg-[#435F56] text-white py-2 px-4 rounded-md hover:bg-[#653329] transition-colors duration-200 font-medium"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-[#653329c0] mt-6">
          حساب کاربری ندارید؟{" "}
          <Link
            href={libraryRoutes.signup}
            className="underline text-[#25463c]"
          >
            ثبت نام
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
>>>>>>> 41dcbf09c5b07749dc41df22db885d371ae92133
