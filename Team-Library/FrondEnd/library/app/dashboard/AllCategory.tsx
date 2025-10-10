import React from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface AllCategoryProps {
  categories: Category[];
  filtredCategories: Category[];
  searchTerm: string;
  editingCategory: number | null;
  confirmDelete: number | null;
  loading: boolean;
  editForm: {
    name: string;
    slug: string;
    description: string;
  };
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateCategory: (categoryId: number) => void;
  onCancelEditing: () => void;
  onDeleteCategory: (categoryId: number) => void;
  onCancelDelete: () => void;
  onStartEditing: (category: Category) => void;
  onSetConfirmDelete: (categoryId: number) => void;
}

const AllCategory: React.FC<AllCategoryProps> = ({
  categories,
  filtredCategories,
  searchTerm,
  editingCategory,
  confirmDelete,
  loading,
  editForm,
  onSearchChange,
  onEditChange,
  onUpdateCategory,
  onCancelEditing,
  onDeleteCategory,
  onCancelDelete,
  onStartEditing,
  onSetConfirmDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجو در دسته‌بندی‌ها..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <h2 className="text-lg font-semibold mb-4">
        نمایش و حذف و ویرایش دسته بندی
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-80 overflow-y-auto py-6 px-2">
        {filtredCategories.map((cat) => (
          <div
            key={cat.id}
            className="border-[3px] border-[#d8d8d8] hover:scale-[1.01] hover:shadow-xl transition-all duration-300 p-3 rounded-xl min-h-0 flex flex-col justify-between"
          >
            {editingCategory === cat.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={onEditChange}
                  placeholder="نام دسته‌بندی"
                  className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
                />
                <input
                  type="text"
                  name="slug"
                  value={editForm.slug}
                  onChange={onEditChange}
                  placeholder="اسلاگ"
                  className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
                />
                <input
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={onEditChange}
                  placeholder="توضیحات"
                  className="border p-1 rounded text-sm ring-1 hover:ring-amber-400 outline-none"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onUpdateCategory(cat.id)}
                    disabled={loading}
                    className="flex-1 bg-lime-600 hover:bg-lime-800 text-white py-1 px-2 rounded-xl text-xs transition-colors disabled:opacity-50"
                  >
                    {loading ? "..." : "ذخیره"}
                  </button>
                  <button
                    onClick={onCancelEditing}
                    disabled={loading}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded-xl text-xs transition-colors disabled:opacity-50"
                  >
                    لغو
                  </button>
                </div>
              </div>
            ) : confirmDelete === cat.id ? (
              <div className="flex flex-col gap-3 text-center">
                <p className="text-sm text-gray-700 font-medium">
                  {` آیا از حذف "${cat.name}" مطمئن هستید؟`}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onDeleteCategory(cat.id)}
                    disabled={loading}
                    className="bg-pink-600 hover:bg-pink-800 text-white py-1 px-3 rounded-xl  text-xs transition-colors disabled:opacity-50"
                  >
                    {loading ? "..." : "بله"}
                  </button>
                  <button
                    onClick={onCancelDelete}
                    disabled={loading}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-1 px-2 rounded-xl text-xs transition-colors disabled:opacity-50"
                  >
                    خیر
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-2">
                  <div className="text-gray-600 text-xs mb-1">نام:</div>
                  <div className="text-[#cc0e0e] font-bold text-sm">
                    {cat.name}
                  </div>
                </div>

                <div>
                  <div className="text-gray-600 text-xs mb-1">
                    اسلاگ:
                  </div>
                  <div className="text-[#cc0e0e] font-bold text-sm break-words line-clamp-2">
                    {cat.slug}
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => onSetConfirmDelete(cat.id)}
                    className="bg-pink-600 hover:bg-pink-800 text-white py-1 px-3 rounded-xl  text-xs transition-colors cursor-pointer mt-2 flex items-center justify-center w-1/2"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => onStartEditing(cat)}
                    className="bg-yellow-300 hover:bg-yellow-500 text-black py-1 px-3 rounded-xl text-xs transition-colors cursor-pointer mt-2 flex items-center justify-center w-1/2"
                  >
                    ویرایش
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {filtredCategories.length === 0 && searchTerm && (
        <div className="text-center text-gray-500 py-8">
          هیچ دسته‌بندی با عنوان ({searchTerm}) یافت نشد
        </div>
      )}
      {categories.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          هیچ دسته‌بندی وجود ندارد
        </div>
      )}
    </div>
  );
};

export default AllCategory;