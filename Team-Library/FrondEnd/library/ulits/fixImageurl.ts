export const fixImageUrl = (url?: string | null): string | undefined => {
    if (!url) return undefined;
  
    try {
      // اگه URL معتبر باشه همون رو برگردون
      new URL(url);
      return url;
    } catch {
     
      if (url.includes("wwwroot")) {
        const relativePath = url.split("wwwroot")[1]; // "/Uploads/Blog/xxx.png"
        return `${process.env.NEXT_PUBLIC_API_BASE_URL}${relativePath}`;
      }
  
  
      return process.env.NEXT_PUBLIC_API_BASE_URL;
    }
  };