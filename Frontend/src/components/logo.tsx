import React from "react";

export default function Logo({
  className = "h-7 w-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 60"
      fill="none"
      className={`${className} transition-all duration-300`}
    >
      {/* Symbol */}
      <path
        d="M30 10L10 50H20L30 30L40 50H50L30 10Z"
        fill="currentColor"
        style={{
          filter:
            "drop-shadow(0 0 4px oklch(0.75 0.26 285 / 0.6)) drop-shadow(0 0 8px oklch(0.75 0.26 285 / 0.4))",
          transition: "all 0.3s ease",
        }}
      />

      {/* Text */}
      <text
        x="65"
        y="40"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fontSize="24"
        fill="currentColor"
        style={{
          letterSpacing: "0.4px",
          filter:
            "drop-shadow(0 0 4px oklch(0.75 0.26 285 / 0.4)) drop-shadow(0 0 8px oklch(0.75 0.26 285 / 0.2))",
          transition: "all 0.3s ease",
        }}
      >
        InfiYield
      </text>

      <style>
        {`
          svg:hover path,
          svg:hover text {
            filter: drop-shadow(0 0 6px oklch(0.75 0.26 285 / 0.8))
                    drop-shadow(0 0 10px oklch(0.75 0.26 285 / 0.6));
            transform: translateY(-0.5px);
          }
        `}
      </style>
    </svg>
  );
}
