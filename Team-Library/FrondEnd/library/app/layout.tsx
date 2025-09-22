
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ToastProvider from "@/components/ToastMessage/ToastProvider";
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
      <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
        <ToastProvider />
      </main>
      <Footer />
    </div>
        </body>
    </html>
  );
}
