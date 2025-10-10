import React from "react";
import Image from "next/image";
import farnosh from "../../assets/profilePhoto/farnoosh.jpg";
import negar from "../../assets/profilePhoto/negar.jpg";
import hamidreza from "../../assets/profilePhoto/hamidreza.jpg";
import mohammad from "../../assets/profilePhoto/mohammad.jpg";
import amir from "../../assets/profilePhoto/amir.jpg";
import abolfaazl from "../../assets/profilePhoto/abolfazl.jpg";
import { StaticImageData } from "next/image";

type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  photo: StaticImageData;
};

const team: TeamMember[] = [
  {
    name: "فرنوش کریمی",
    role: "فرانت‌اند",
    linkedin: "https://www.linkedin.com/in/farnooshkarimi/",
    photo: farnosh,
  },
  {
    name: "حمیدرضا هدایتی",
    role: "فرانت‌اند",
    linkedin: "https://www.linkedin.com/in/hamidreza-hedayati-front-end/",
    photo: hamidreza,
  },
  {
    name: "نگار یادگاری",
    role: "فرانت‌اند",
    linkedin: "https://www.linkedin.com/in/negar-yadegari-b57811305/",
    photo: negar,
  },
  {
    name: "ابوالفضل شعبانی",
    role: "بک‌اند",
    linkedin: "https://www.linkedin.com/in/abolfaazl-shabaani-/",
    photo: abolfaazl,
  },
  {
    name: "امیرحسین شیراوندی",
    role: "بک‌اند",
    linkedin: "https://www.linkedin.com/in/amirhossein-shiravandi-1b8079281/",
    photo: amir,
  },
  {
    name: "محمد فرجی",
    role: "بک‌اند",
    linkedin: "https://www.linkedin.com/in/mohammadfaraji/",
    photo: mohammad,
  },
];

const AboutUsPage: React.FC = () => {
  return (
    <main className="max-w-6xl mx-auto mt-12 py-12 px-4 md:p-12">
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">درباره ما</h1>
        <p className="text-gray-700 leading-relaxed">{`به کتابخانهٔ آنلاین ما خوش آمدید! ما یک پلتفرم جامع برای دوستداران کتاب ساخته‌ایم تا بتوانند کتاب‌های برتر و جدید را ببینند، دسته‌بندی‌ها را مرور کنند، و بر اساس نام یا نویسنده جستجو کنند.`}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 mb-10">
        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">ویژگی‌های کلیدی</h2>
          <ul className="list-disc pr-5 text-gray-700 space-y-2">
            <li>صفحهٔ اصلی با نمایش کتاب‌های برتر و جدید</li>
            <li>لیست دسته‌بندی‌ها و امکان مرور بر اساس ژانر</li>
            <li>جستجو بر اساس نام کتاب و نویسنده</li>
            <li>فیلترهای رنک، زبان، دسته‌بندی و تعداد صفحات</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">کاربران و مدیریت</h2>
          <ul className="list-disc pr-5 text-gray-700 space-y-2">
            <li>ثبت‌نام و ورود کاربران</li>
            <li>امکان بازیابی و تغییر رمز عبور</li>
            <li>پنل ادمین برای اضافه/ویرایش/حذف کتاب‌ها و دسته‌بندی‌ها</li>
            <li>مدیریت کامل دسته‌بندی‌ها</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">فناوری‌ها</h2>
        <p className="text-gray-700 leading-relaxed">
          پروژه با استفاده از <strong>React</strong> و <strong>Next.js</strong>{" "}
          در فرانت‌اند و <strong>.NET</strong> در بک‌اند توسعه داده شده است تا
          تجربه‌ای سریع، امن و مقیاس‌پذیر فراهم کند.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">تیم ما</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {team.map((m) => (
            <article
              key={m.name}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium text-gray-700">
                <Image
                  width={56}
                  height={56}
                  src={m.photo}
                  alt={m.name}
                  className="rounded-full"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{m.name}</h3>
                  <span className="text-sm text-gray-500">{m.role}</span>
                </div>
                <div className="mt-2">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {/* LinkedIn SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2c-1.657 0-2 1.343-2 2v7h-4v-14h4v2.5a3.5 3.5 0 0 1 3.5-3.5z" />
                      <rect x="2" y="9" width="4" height="12" rx="1" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    مشاهده در لینکدین
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-600">
        <p>
          ما امیدواریم این پلتفرم به رشد فرهنگ مطالعه کمک کند — تیم کتابخانه
          آنلاین.
        </p>
      </footer>
    </main>
  );
};

export default AboutUsPage;
