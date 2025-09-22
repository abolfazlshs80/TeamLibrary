import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <span
        className="h-12 w-12 border-4   rounded-full  "
        style={{
          display: "inline-block",
          animation: "dynamicSpin 1s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes dynamicSpin {
          0% { transform: rotate(36deg);border-color:#F0E1DE; border-top-color:transparent; border-right-color:transparent; border-bottom-color:transparent;}
          25% { transform: rotate(150deg); border-color:#F0E1DE; border-top-color:transparent; border-right-color:transparent; }
          50% { transform: rotate(324deg); border-color:#F0E1DE;border-top-color:transparent;}
          100% { transform: rotate(360deg); border-color:#F0E1DE; border-top-color:transparent; border-right-color:transparent; border-bottom-color:transparent;}
        }
      `}</style>
    </div>
  );
}
