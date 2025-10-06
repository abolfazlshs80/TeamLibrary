export type ButtonProps ={
  type: "button" | "submit" | "reset";
  label: string;
  widthBtn?: string;
  colorBtn?: string;
  colorBtnText?: string; 
  colorBtnBorder?: string;
  colorBtnHover?: string;
  colorBtnActive?: string; 
  // btnIcon?: StaticImageData|null;
  btnIcon?: string|null;
  marginTop?:string;
  fontWeight?: 'regular' | 'bold' | 'medium'| 'semibold';
  style?: React.CSSProperties;
  onclick?: () => void;
}

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
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  value: string;
}