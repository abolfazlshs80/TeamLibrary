import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ToastProvider from "@/components/ToastMessage/ToastProvider";
import { AuthProvider } from "@/context/AuthContext";  // 👈 اضافه شد

export const metadata: Metadata = {
  title: "کتابخانه",
  description: "سایت مدیریت کتابخانه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ fontFamily: "Nahid, sans-serif" }}>
        <AuthProvider>   {/* 👈 اینجا */}
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
              <ToastProvider />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
