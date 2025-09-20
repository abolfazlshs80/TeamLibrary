"use client"
import React, { useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
const Signup = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    email: "",
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Account/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || data.statusCode !== 200) {
        throw new Error(data.message || "ثبت‌نام ناموفق بود")
      }

      const token = data?.data?.accessToken
      const expiresAt = data?.data?.expiresAt

      if (token) {
       
        const expiryDate = new Date(expiresAt)
        const now = new Date()
        const maxAgeSeconds = Math.floor((expiryDate.getTime() - now.getTime()) / 1000)

        Cookies.set("accessToken", token, {
          expires: maxAgeSeconds / 86400, 
          path: "/",
        })

        toast.success("ثبت‌نام موفق  در حال هدایت به صفحه اصلی...")
        setTimeout(() => router.push("/"), 800)
      } else {
        console.log("ثبت‌نام موفق شد ولی توکن دریافت نشد")
      }
    } catch (error: any) {
      toast.error(error?.message || " مشکلی درثبت نام رخ داد ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5E9] pt-20 pb-10 px-4">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#435F56]">
          ایجاد حساب کاربری
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input id="fullName" value={formData.fullName} 
          onChange={handleChange} placeholder="نام کامل" required 
          className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50" />

          <input id="userName" value={formData.userName} 
          onChange={handleChange} placeholder="نام کاربری" required 
          className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50" />

          <input id="password" type="password" value={formData.password} 
          onChange={handleChange} placeholder="رمز عبور" required minLength={8}
           className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50" />

          <input id="email" type="email" value={formData.email} 
          onChange={handleChange} placeholder="ایمیل" required 
          className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B2685A] focus:border-transparent bg-white/50" />

          <button type="submit" disabled={loading} className="w-full bg-[#435F56] text-white py-2 rounded-md hover:bg-[#365048]">
            {loading ? "در حال ارسال..." : "ایجاد حساب"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Signup