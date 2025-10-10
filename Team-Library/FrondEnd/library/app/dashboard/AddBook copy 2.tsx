// import { Book, Category } from "@/modal/types";
// import axios, { AxiosError } from "axios";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { ClipLoader } from "react-spinners";

// const AddBook = () => {
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [bookCategory, setBookCategory] = useState<Category[]>([]);
//   const [bookTitle, setBookTitle] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedCategoryID, setSelectedCategoryID] = useState(0);
//   const [description, setDescription] = useState("");
//   const [rank, setRank] = useState(1);
//   const [publicationYear, setPublicationYear] = useState("");
//   const [author, setAuthor] = useState("");
//   const [pages, setPages] = useState("");
//   const [price, setPrice] = useState("");
//   const [language, setLanguage] = useState("");
//   const [translator, setTranslator] = useState("");

//   const [bookImage, setBookImage] = useState<File | null>(null);
//   const [bookImagePreview, setBookImagePreview] = useState<string>("");
//   const [imageLoading, setImageLoading] = useState(false);

//   // 🔹 فایل PDF جدید
//   const [bookPdf, setBookPdf] = useState<File | null>(null);
//   const [pdfFileName, setPdfFileName] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/GetAllCategory?PageNumber=1&PageSize=100`
//         );
//         const categoryList: Category[] = res.data.data.list;
//         setBookCategory(categoryList);

//         if (categoryList.length > 0) {
//           setSelectedCategory(categoryList[0].name);
//           setSelectedCategoryID(categoryList[0].id);
//         }
//       } catch (error) {
//         console.error("خطا در گرفتن دسته‌بندی‌ها:", error);
//         setBookCategory([]);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // 🔹 تابع تبدیل به base64 بدون data:image/jpeg;base64,
//   const convertToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         if (typeof reader.result === "string") {
//           // حذف قسمت نوع فایل
//           const base64 = reader.result.split(",")[1];
//           resolve(base64);
//         } else {
//           reject(new Error("خطا در تبدیل فایل"));
//         }
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         toast.error("لطفاً یک فایل تصویر انتخاب کنید");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast("حجم فایل باید کمتر از 5 مگابایت باشد");
//         return;
//       }

//       setImageLoading(true);
//       setBookImage(file);

//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target?.result) {
//           setBookImagePreview(e.target.result as string);
//         }
//         setImageLoading(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // 🔹 تابع هندل فایل PDF
//   const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.type !== "application/pdf") {
//         toast.error("فقط فایل PDF مجاز است");
//         return;
//       }
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error("حجم فایل PDF باید کمتر از 10 مگابایت باشد");
//         return;
//       }
//       setBookPdf(file);
//       setPdfFileName(file.name);
//     }
//   };

//   const generateSlug = (text: string) =>
//     text
//       .trim()
//       .replace(/\s+/g, "_")
//       .replace(/[^a-z0-9\u0600-\u06FF\_]/g, "");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSubmitLoading(true);

//     try {
//       let imageBase64 = "";
//       let pdfBase64 = "";

//       if (bookImage) {
//         imageBase64 = await convertToBase64(bookImage);
//       }

//       if (bookPdf) {
//         pdfBase64 = await convertToBase64(bookPdf);
//       }

//       const bookData: Book = {
//         title: bookTitle,
//         author: author,
//         translator: translator || "",
//         publicationYear: parseInt(publicationYear) || 0,
//         pages: parseInt(pages) || 0,
//         price: parseInt(price) || 0,
//         language: language,
//         categoryId: selectedCategoryID,
//         rank: rank,
//         slug: `${generateSlug(bookTitle)}_${generateSlug(
//           author
//         )}_${generateSlug(publicationYear)}`,
//         description: description,
//         pdfPath: pdfBase64 || "",
//         image: imageBase64 || "",
//       };

//       console.log("📤 داده‌های ارسالی:", {
//         ...bookData,
//         image: imageBase64 ? `${imageBase64.substring(0, 50)}...` : "بدون عکس",
//         pdfPath: pdfBase64 ? `${pdfBase64.substring(0, 50)}...` : "بدون PDF",
//       });

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/create`,
//         bookData,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("✅ پاسخ سرور:", response.data);
//       toast.success("کتاب با موفقیت اضافه شد!");
//       resetForm();
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message?: string }>;
//       console.error("❌ خطا در ارسال کتاب:", axiosError);

//       if (axiosError.response) {
//         toast.error(
//           `خطا: ${axiosError.response.data?.message || "خطا در ارسال داده‌ها"}`
//         );
//       } else {
//         toast.error("خطا در ارتباط با سرور");
//       }
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setBookTitle("");
//     setAuthor("");
//     setTranslator("");
//     setPublicationYear("");
//     setPages("");
//     setPrice("");
//     setLanguage("");
//     setDescription("");
//     setRank(1);
//     setBookImage(null);
//     setBookImagePreview("");
//     setBookPdf(null);
//     setPdfFileName("");

//     if (bookCategory.length > 0) {
//       setSelectedCategory(bookCategory[0].name);
//       setSelectedCategoryID(bookCategory[0].id);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           نام کتاب
//         </label>
//         <input
//           type="text"
//           value={bookTitle}
//           onChange={(e) => setBookTitle(e.target.value)}
//           placeholder="نام کتاب"
//           className="border p-2 rounded"
//           required
//         />
//       </div>
//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           نام نویسنده
//         </label>
//         <input
//           type="text"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           placeholder="نام نویسنده"
//           className="border p-2 rounded"
//           required
//         />
//       </div>
//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           نام مترجم
//         </label>
//         <input
//           type="text"
//           value={translator}
//           onChange={(e) => setTranslator(e.target.value)}
//           placeholder="نام مترجم"
//           className="border p-2 rounded"
//         />
//       </div>
//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">سال چاپ</label>
//         <input
//           type="number"
//           value={publicationYear}
//           onChange={(e) => setPublicationYear(e.target.value)}
//           placeholder="سال چاپ"
//           className="border p-2 rounded"
//           min="1000"
//           max="2100"
//         />
//       </div>

//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           تعداد صفحات
//         </label>
//         <input
//           type="number"
//           value={pages}
//           onChange={(e) => setPages(e.target.value)}
//           placeholder="تعداد صفحات"
//           className="border p-2 rounded"
//           min="1"
//         />
//       </div>

//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           قیمت کتاب
//         </label>
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="قیمت کتاب"
//           className="border p-2 rounded"
//           min="0"
//         />
//       </div>

//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           زبان کتاب
//         </label>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="border p-2 rounded"
//           required
//         >
//           <option value="">انتخاب زبان</option>
//           {["فارسی", "انگلیسی", "فرانسوی", "عربی"].map((lang, index) => (
//             <option key={index} value={lang}>
//               {lang}
//             </option>
//           ))}
//         </select>
//       </div>
//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           دسته‌بندی
//         </label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => {
//             const selectedName = e.target.value;
//             setSelectedCategory(selectedName);

//             const selectedCat = bookCategory.find(
//               (cat) => cat.name === selectedName
//             );
//             if (selectedCat) {
//               setSelectedCategoryID(selectedCat.id);
//             } else {
//               setSelectedCategoryID(0);
//             }
//           }}
//           className="border p-2 rounded"
//           required
//         >
//           <option value="">انتخاب کنید</option>
//           {bookCategory.map((category) => (
//             <option key={category.id} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">رنک</label>
//         <select
//           value={rank}
//           onChange={(e) => setRank(Number(e.target.value))}
//           className="border p-2 rounded"
//         >
//           {[1, 2, 3, 4, 5].map((rankOption, index) => (
//             <option key={index} value={rankOption}>
//               {rankOption}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* ============================ */}

//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           عکس کتاب
//         </label>

//         {bookImagePreview && (
//           <div className="mb-3">
//             <p className="text-xs text-gray-500 mb-2">پیش‌نمایش:</p>
//             <Image
//               src={bookImagePreview}
//               alt="پیش‌نمایش عکس کتاب"
//               width={150}
//               height={150}
//               className="max-w-48 max-h-48 object-cover rounded border"
//             />
//           </div>
//         )}

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="border p-2 rounded"
//           disabled={imageLoading}
//         />

//         {imageLoading && (
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <ClipLoader color="#914a37" size={16} />
//             در حال پردازش عکس...
//           </div>
//         )}

//         <p className="text-xs text-gray-500 mt-1">
//           فرمت‌های مجاز: JPG, PNG, GIF - حداکثر حجم: 5MB
//         </p>
//       </div>

//       {/* ============================ */}
//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           توضیحات کتاب
//         </label>
//         <textarea
//           placeholder="توضیحات کتاب"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           rows={4}
//           maxLength={400}
//           className="border p-2 rounded"
//         ></textarea>
//       </div>

//       <div className="flex flex-col gap-1">
//         <label className="text-xs sm:text-sm text-gray-600 pr-1">
//           فایل PDF کتاب
//         </label>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handlePdfChange}
//           className="border p-2 rounded"
//         />
//         {pdfFileName && (
//           <p className="text-xs text-gray-500 mt-1">
//             فایل انتخاب‌شده: {pdfFileName}
//           </p>
//         )}
//       </div>

//       {/* سایر بخش‌ها مثل عکس، توضیحات، دکمه ذخیره */}
//       <button
//         type="submit"
//         disabled={submitLoading}
//         className="bg-[#914a37] text-white py-2 px-4 rounded disabled:opacity-50 flex items-center justify-center gap-2"
//       >
//         {submitLoading ? (
//           <>
//             <ClipLoader color={"white"} size={20} />
//             در حال ذخیره...
//           </>
//         ) : (
//           "ذخیره کتاب"
//         )}
//       </button>
//     </form>
//   );
// };

// export default AddBook;
