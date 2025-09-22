export const fixImagePath = (path?: string | null) => {
    if (!path) return null;
  
    // حذف مسیر لوکال و تبدیل به URL
    const fileName = path.split(/(\\|\/)/).pop(); // آخرین قسمت مسیر
    if (!fileName) return null;
  
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/Uploads/Blog/${fileName}`;
  };