// modal/getImageUrl.ts
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // اگر آدرس کامل است (شامل http یا https)
  if (imagePath.startsWith('http://') || imagePath.startsWith('http://')) {
    return imagePath;
  }
  
  // اگر آدرس نسبی است و با / شروع نشده
  if (!imagePath.startsWith('/')) {
    imagePath = '/' + imagePath;
  }
  
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${imagePath}`;
};