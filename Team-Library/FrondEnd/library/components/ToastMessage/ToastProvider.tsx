"use client"
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          className: "custom-toast", 
          success: {
            style: {
              background: "#d1fae5",
              color: "#065f46",
              border: "1px solid #10b981",
              borderRadius: "8px",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#d1fae5",
            },
          },
          error: {
            style: {
              background: "#fee2e2",
              color: "#991b1b",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fee2e2",
            },
          },
        }}
      />


      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(20px) scale(1); 
          }
        }

        .custom-toast {
          animation: slideDown 0.5s ease forwards;
        }
      `}</style>
    </>
  );
}