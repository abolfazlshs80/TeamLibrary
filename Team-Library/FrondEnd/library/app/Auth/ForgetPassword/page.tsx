"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
const ForgetPassword = () => {
  const {isLoggedIn} = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"email" | "reset">("email");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handleForgetPassword = async () => {
    try {
      const res = await fetch("http://abolfazl11111.runasp.net/api/Account/ForgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ""}`,   
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("ایمیل بازیابی رمز عبور ارسال شد ✅");
        setStep("reset");  
      } else {
        setMessage("خطا در ارسال درخواست ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("مشکلی پیش آمد ❌");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch("http://abolfazl11111.runasp.net/api/Account/ResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ""}`,   
        },
        body: JSON.stringify({ email, code, password }),
      });

      if (res.ok) {
        setMessage("رمز عبور با موفقیت تغییر کرد ✅");
        setStep("email"); 
        setEmail("");
        setCode("");
        setPassword("");
        router.push('/Auth/login')
      } else {
        const errData = await res.json();
        setMessage(errData.message || errData.errors?.[0] || "خطا در تغییر رمز ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("مشکلی پیش آمد ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5E9] flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#435F56]">
        {isLoggedIn ? "تغییر رمز عبور" : "فراموشی رمز عبور"}
        </h1>

        {step === "email" && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md bg-white/50 mb-4"
              placeholder="ایمیل خود را وارد کنید"
            />
            <button
              onClick={handleForgetPassword}
              className="w-full bg-[#435F56] text-white py-2 px-4 rounded-md hover:bg-[#653329] transition-colors duration-200 font-medium"
            >
          {isLoggedIn ? "تغییر رمز عبور" : "ارسال لینک بازیابی"}
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md bg-white/50 mb-4"
              placeholder="کد ارسال شده به ایمیل"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-[#F0E1DE] rounded-md bg-white/50 mb-4"
              placeholder="رمز عبور جدید"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-[#435F56] text-white py-2 px-4 rounded-md hover:bg-[#653329] transition-colors duration-200 font-medium"
            >
              تغییر رمز عبور
            </button>
          </>
        )}

        {message && <p className="text-center mt-4 text-sm text-[#653329]">{message}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;
