import React from "react";
// import buttonIcon from "@/assets/icons/arrowWhite.svg";
// import buttonIcon from "../../assets/arrowWhite.svg";
import { ButtonProps } from "@/modal/types";
// import Image from "next/image";

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  widthBtn,
  colorBtn = "bg-[#435F56]",
  colorBtnText = "text-white",
  colorBtnBorder = "border-[#F0E1DE]",
  colorBtnHover = "hover:bg-[#435F56]",
  colorBtnActive = "active:bg-[#435F56]",
  // btnIcon = buttonIcon,
  marginTop = "4px",
  fontWeight = "regular",
  style = {},
  onclick,
}) => {
  return (
    <div>
      <button
        className={`rounded-2xl text-sm sm:text-base md:text-lg  flex gap-4 items-center justify-center border-1 px-12 pb-2 pt-1 shadow-lg shadow-black/30 hover:cursor-pointer font-medium ${colorBtn} ${colorBtnBorder} ${colorBtnText} ${colorBtnHover} ${colorBtnActive}`}
        type={type}
        style={{
          width: widthBtn,
          backgroundColor: colorBtn,
          color: colorBtnText,
          borderColor: colorBtnBorder,
          marginTop: marginTop,
          fontWeight: fontWeight,
          ...style,
        }}
        onClick={onclick}
      >
        {/* {btnIcon && (
          <Image src={btnIcon} alt="button icon" width={24} height={24} style={{width:'4%', height:'4%'}}/>
        )} */}
        <p>{label}</p>
      </button>
    </div>
  );
};

export default Button;
