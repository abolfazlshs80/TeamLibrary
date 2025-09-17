"use client"
import Link from 'next/link'
import { useState } from 'react';
import toast from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async() => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Account?CreateToken?${email}&password=${password}`,
        {
          method: "GET",
        }
      );
      if(!res.ok) {
        toast.error("ایمیل یا رمز عبور اشتباه است");
        return;
      }
      const result = await res.json();
      const token = result.data.token;
      document.cookie = `token=${token};path=/;`;
      toast.success("ورود با موفقیت بود");
      window.location.href = "/profile";
    }catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد دوباره تلاش کنید");
    }
  };

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
            className="w-full bg-[#435F56] text-white py-2 px-4 rounded-md hover:bg-[#653329] transition-colors duration-200 font-medium"
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
