"use client"
import { useEffect, useState } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { libraryRoutes } from "@/routes"
import Link from "next/link"
export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
   
    const token = Cookies.get("tokenlogin");

    if (!token) {
      setLoading(false)
      setError("هیچ توکنی پیدا نشد. لطفاً وارد شوید.")
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Account/GetDetailsUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const result = await res.json()
        if (!res.ok || result.statusCode !== 200) {
          throw new Error(result.message || "خطای ناشناخته")
        }
        return result
      })
      .then((data) => {
        console.log("پاسخ بک‌اند:", data)

        setUser(data.data.user)
      })
      .catch((err) => {
        console.error("خطا در گرفتن اطلاعات:", err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = () => {
    Cookies.remove("tokenlogin")
    router.push(libraryRoutes.login);
  }

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
  if (!user) return <p className="text-center mt-10">اطلاعات کاربر یافت نشد</p>

  return (
    <div className="min-h-screen  flex justify-center items-center bg-[#F7F5E9]">
      <div className="bg-[#F0E1DE] shadow-lg rounded-2xl p-6 w-full max-w-md text-center border border-[#435F56]/20">
        <h1 className="text-xl font-bold mb-4 text-[#435F56]">
          سلام {user.fullName || "کاربر"} خوش آمدید
        </h1>

        <div className="text-[#435F56] space-y-2 mb-6 text-right">
          <p>
            <span className="font-semibold">ایمیل:</span> {user.email || "—"}
          </p>
          <p>
            <span className="font-semibold">نام کاربری:</span>{" "}
            {user.userName || "—"}
          </p>
          <p>
            <span className="font-semibold">شناسه کاربر (ID):</span>{" "}
            {user.userId || "—"}
          </p>
        </div>
         <div className="flex content-between gap-3.5">
             <button
              onClick={handleLogout}
              className="flex items-center gap-2 justify-center w-full bg-red-500 hover:bg-red-800 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              <AiOutlineLogout size={20} />
              خروج از حساب
            </button>
            <Link
              href={libraryRoutes.ForgetPassword}
              className="flex items-center gap-2 justify-center w-full bg-[#B2685A] hover:bg-[#926157] text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
            
              تغییر رمز عبور
            </Link>
         </div>

      </div>
    </div>
  )
}