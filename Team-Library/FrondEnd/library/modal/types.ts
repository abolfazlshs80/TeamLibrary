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