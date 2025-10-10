// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ClipLoader } from "react-spinners";
// import Image from "next/image";
// import { Category, EditForm, UpdateBook } from "@/modal/types";
// import toast from "react-hot-toast";

// const AllBooks = () => {
//   const [books, setBooks] = useState<UpdateBook[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingBook, setEditingBook] = useState<number | null>(null);
//   const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [editForm, setEditForm] = useState<EditForm>({
//     title: "",
//     author: "",
//     translator: "",
//     publicationYear: 0,
//     pages: 0,
//     price: 0,
//     language: "",
//     categoryId: 0,
//     rank: 1,
//     slug: "",
//     description: "",
//     image: "",
//   });
//   const [bookImage, setBookImage] = useState<File | null>(null);
//   const [bookImagePreview, setBookImagePreview] = useState<string>("");
//   const [imageLoading, setImageLoading] = useState(false);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/GetAllBooks?PageNumber=1&PageSize=1000`
//       );
//       setBooks(response.data.data.list || []);
//     } catch (error) {
//       console.error("خطا در دریافت کتاب‌ها:", error);
//       alert("خطا در دریافت کتاب‌ها");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Category/GetAllCategory?PageNumber=1&PageSize=1000`
//       );
//       setCategories(response.data.data.list || []);
//     } catch (error) {
//       console.error("خطا در دریافت دسته‌بندی‌ها:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//     fetchCategories();
//   }, []);

//   const filteredBooks = books.filter(
//     (book) =>
//       book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.author.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const onStartEditing = (book: UpdateBook) => {
//     if (book.id) {
//       setEditingBook(book.id);
//     }
//     setEditForm({
//       title: book.title,
//       author: book.author,
//       translator: book.translator || "",
//       publicationYear: book.publicationYear,
//       pages: book.pages,
//       price: book.price,
//       language: book.language,
//       categoryId: book.categoryId,
//       rank: book.rank,
//       slug: book.slug,
//       description: book.description,
//       image: book.image,
//     });
//     if (book.image) {
//       setBookImagePreview(book.image);
//     }
//   };

//   const onCancelEditing = () => {
//     setEditingBook(null);
//     setEditForm({
//       title: "",
//       author: "",
//       translator: "",
//       publicationYear: 0,
//       pages: 0,
//       price: 0,
//       language: "",
//       categoryId: 0,
//       rank: 1,
//       slug: "",
//       description: "",
//       image: "",
//     });
//     setBookImage(null);
//     setBookImagePreview("");
//   };

//   const onEditChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({
//       ...prev,
//       [name]:
//         name === "publicationYear" ||
//         name === "pages" ||
//         name === "price" ||
//         name === "rank" ||
//         name === "categoryId"
//           ? Number(value)
//           : value,
//     }));
//   };

//   const convertToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         if (typeof reader.result === "string") {
//           resolve(reader.result);
//         } else {
//           reject(new Error("خطا در تبدیل عکس"));
//         }
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const generateSlug = (text: string) =>
//     text
//       .trim()
//       .replace(/\s+/g, "_")
//       .replace(/[^a-z0-9\u0600-\u06FF\_]/g, "");

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         toast("لطفاً یک فایل تصویر انتخاب کنید");
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

//   const onUpdateBook = async (bookId: number) => {
//     try {
//       setLoading(true);

//       let imageBase64 = editForm.image;
//       if (bookImage) {
//         imageBase64 = await convertToBase64(bookImage);
//       }

//       const updateData = {
//         ...editForm,
//         image: imageBase64,
//         slug: `${generateSlug(editForm.title)}_${generateSlug(
//           editForm.author
//         )}_${editForm.publicationYear}`,
//       };

//       await axios.put(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Book/update`,
//         { ...updateData, id: bookId }
//       );

//       await fetchBooks();
//       onCancelEditing();
//       toast.success("کتاب با موفقیت ویرایش شد!");
//     } catch (error) {
//       console.error("خطا در ویرایش کتاب:", error);
//       toast.error("خطا در ویرایش کتاب");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDeleteBook = async (bookId: number) => {
//     try {
//       setLoading(true);
//       await axios.delete(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/BookDelete`,
//         { data: { id: bookId } }
//       );

//       await fetchBooks();
//       setConfirmDelete(null);
//       toast.success("کتاب با موفقیت حذف شد!");
//     } catch (error) {
//       console.error("خطا در حذف کتاب:", error);
//       toast.error("خطا در حذف کتاب");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSetConfirmDelete = (bookId: number) => {
//     setConfirmDelete(bookId);
//   };

//   const onCancelDelete = () => {
//     setConfirmDelete(null);
//   };

//   const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow py-6 px-2 sm:p-6">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="جستجو در کتابها..."
//           value={searchTerm}
//           onChange={onSearchChange}
//           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//       </div>
//       <h2 className="text-lg font-semibold mb-4">نمایش و حذف و ویرایش کتاب</h2>

//       {loading && !editingBook && (
//         <div className="flex justify-center py-4">
//           <ClipLoader color="#914a37" size={32} />
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
//         {filteredBooks.map((book) => (
//           <div
//             key={book.id}
//             className="border-2 border-[#ebc2a1] hover:rounded-2xl hover:border-[#B2685A] p-3 rounded-md transition-colors duration-300 min-h-0 flex flex-col justify-between"
//           >
//             {editingBook === book.id ? (
//               <div className="flex flex-col gap-2">
//                 <input
//                   type="text"
//                   name="title"
//                   value={editForm.title}
//                   onChange={onEditChange}
//                   placeholder="عنوان کتاب"
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 />
//                 <input
//                   type="text"
//                   name="author"
//                   value={editForm.author}
//                   onChange={onEditChange}
//                   placeholder="نویسنده"
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 />
//                 <input
//                   type="text"
//                   name="translator"
//                   value={editForm.translator}
//                   onChange={onEditChange}
//                   placeholder="مترجم"
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 />
//                 <input
//                   type="number"
//                   name="publicationYear"
//                   value={editForm.publicationYear}
//                   onChange={onEditChange}
//                   placeholder="سال انتشار"
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 />
//                 <input
//                   type="number"
//                   name="pages"
//                   value={editForm.pages}
//                   onChange={onEditChange}
//                   placeholder="تعداد صفحات"
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   value={editForm.price}
//                   onChange={onEditChange}
//                   placeholder="قیمت"
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 />

//                 <select
//                   name="language"
//                   value={editForm.language}
//                   onChange={onEditChange}
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 >
//                   <option value="">انتخاب زبان</option>
//                   {["فارسی", "انگلیسی", "فرانسوی", "عربی"].map(
//                     (lang, index) => (
//                       <option key={index} value={lang}>
//                         {lang}
//                       </option>
//                     )
//                   )}
//                 </select>

//                 <select
//                   name="categoryId"
//                   value={editForm.categoryId}
//                   onChange={onEditChange}
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 >
//                   <option value="">انتخاب دسته‌بندی</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   name="rank"
//                   value={editForm.rank}
//                   onChange={onEditChange}
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 >
//                   {[1, 2, 3, 4, 5].map((rankOption) => (
//                     <option key={rankOption} value={rankOption}>
//                       {rankOption}
//                     </option>
//                   ))}
//                 </select>

//                 <textarea
//                   name="description"
//                   value={editForm.description}
//                   onChange={onEditChange}
//                   placeholder="توضیحات"
//                   rows={3}
//                   className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
//                 />

//                 <div className="flex flex-col gap-1">
//                   <label className="text-xs text-gray-600">عکس کتاب:</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="border p-1 rounded text-sm"
//                     disabled={imageLoading}
//                   />
//                   {bookImagePreview && (
//                     <Image
//                       src={bookImagePreview}
//                       alt="پیش‌نمایش"
//                       width={64}
//                       height={64}
//                       className="w-16 h-16 object-cover rounded mt-1"
//                     />
//                   )}
//                 </div>

//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() => onUpdateBook(book.id)}
//                     disabled={loading}
//                     className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs transition-colors disabled:opacity-50"
//                   >
//                     {loading ? "..." : "ذخیره"}
//                   </button>
//                   <button
//                     onClick={onCancelEditing}
//                     disabled={loading}
//                     className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded text-xs transition-colors disabled:opacity-50"
//                   >
//                     لغو
//                   </button>
//                 </div>
//               </div>
//             ) : confirmDelete === book.id ? (
//               <div className="flex flex-col gap-3 text-center">
//                 <p className="text-sm text-gray-700 font-medium">
//                   {` آیا از حذف "${book.title}" مطمئن هستید؟`}
//                 </p>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => onDeleteBook(book.id)}
//                     disabled={loading}
//                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs transition-colors disabled:opacity-50"
//                   >
//                     {loading ? "..." : "بله"}
//                   </button>
//                   <button
//                     onClick={onCancelDelete}
//                     disabled={loading}
//                     className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded text-xs transition-colors disabled:opacity-50"
//                   >
//                     خیر
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div className="space-y-2">
//                   {book.image && (
//                     <div className="flex justify-center mb-2">
//                       <Image
//                         src={book.image}
//                         alt={book.title}
//                         width={64}
//                         height={80}
//                         className="w-16 h-20 object-cover rounded shadow"
//                       />
//                     </div>
//                   )}

//                   <div>
//                     <div className="text-gray-600 text-xs mb-1">عنوان:</div>
//                     <div className="text-[#cc0e0e] font-bold text-sm line-clamp-2">
//                       {book.title}
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-gray-600 text-xs mb-1">نویسنده:</div>
//                     <div className="text-gray-800 text-sm">{book.author}</div>
//                   </div>

//                   {book.translator && (
//                     <div>
//                       <div className="text-gray-600 text-xs mb-1">مترجم:</div>
//                       <div className="text-gray-800 text-sm">
//                         {book.translator}
//                       </div>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     <div>
//                       <div className="text-gray-600">صفحه:</div>
//                       <div>{book.minPageCount}</div>
//                     </div>
//                     <div>
//                       <div className="text-gray-600">زبان:</div>
//                       <div>{book.language}</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-1 mt-3">
//                   <button
//                     onClick={() => onSetConfirmDelete(book.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs transition-colors cursor-pointer flex items-center justify-center w-1/2"
//                   >
//                     حذف
//                   </button>
//                   <button
//                     onClick={() => onStartEditing(book)}
//                     className="bg-yellow-300 hover:bg-yellow-500 text-black py-1 px-3 rounded text-xs transition-colors cursor-pointer flex items-center justify-center w-1/2"
//                   >
//                     ویرایش
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       {filteredBooks.length === 0 && searchTerm && (
//         <div className="text-center text-gray-500 py-8">
//           {`هیچ کتابی با عنوان "${searchTerm}" یافت نشد`}
//         </div>
//       )}

//       {books.length === 0 && !loading && (
//         <div className="text-center text-gray-500 py-8">
//           هیچ کتابی وجود ندارد
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllBooks;
