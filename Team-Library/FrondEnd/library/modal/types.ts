export type ButtonProps = {
  type: "button" | "submit" | "reset";
  label: string;
  widthBtn?: string;
  colorBtn?: string;
  colorBtnText?: string;
  colorBtnBorder?: string;
  colorBtnHover?: string;
  colorBtnActive?: string;
  // btnIcon?: StaticImageData|null;
  btnIcon?: string | null;
  marginTop?: string;
  fontWeight?: "regular" | "bold" | "medium" | "semibold";
  style?: React.CSSProperties;
  onclick?: () => void;
};

export interface Books {
  id: number;
  title: string;
  author: string;
  slug: string;
  categoryName: string;
  imageUrl: string;
  rank: number;
  minPageCount: number;
  maxPageCount: number;
  language: string;
}

export interface Book {
  id?: number;
  title: string;
  slug: string;
  categoryId: number;
  pdfPath: string;
  description: string;
  rank: number;
  publicationYear: number;
  author: string;
  pages: number;
  price: number;
  language: string;
  translator: string;
  image?: string;
}

export interface UpdateBook {
  id: number;
  title: string;
  slug: string;
  categoryId: number;
  pdfPath: string;
  description: string;
  rank: number;
  publicationYear: number;
  author: string;
  pages: number;
  minPageCount: number,
  maxPageCount: number,
  price: number;
  language: string;
  translator: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface EditForm {
  title: string;
  author: string;
  translator: string;
  publicationYear: number;
  pages: number;
  price: number;
  language: string;
  categoryId: number;
  rank: number;
  slug: string;
  description: string;
  image: string;
  pdfPath: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  value: string;
}
