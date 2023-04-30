import React from "react";

interface Props {
  color?: "black" | "white";
}

export const EditIcon: React.FC<Props> = ({ color = "black" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 96 960 960"
      width="24"
    >
      <path
        fill={color}
        d="M200 1044q-33 0-56.5-23.5T120 964V404q0-33 23.5-56.5T200 324h357l-80 80H200v560h560V686l80-80v358q0 33-23.5 56.5T760 1044H200Zm280-360Zm167-337 57 56-264 264v57h56l265-265 57 56-265 265q-11 11-25.5 17.5T497 804h-97q-17 0-28.5-11.5T360 764v-97q0-16 6-30.5t17-25.5l264-264Zm171 168L647 347l100-100q24-24 57.5-24t56.5 24l56 57q23 23 23 56t-23 56l-99 99Z"
      />
    </svg>
  );
};
