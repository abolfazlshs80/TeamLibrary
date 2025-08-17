import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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
      <body style={{ fontFamily: "Vazir, sans-serif" }}>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
