import React from "react";

interface Props {
  color?: string;
}

export const UploadIcon: React.FC<Props> = ({ color = "black" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill={color}
    >
      <path d="M450.001-328.462v-336.001l-98.615 98.615-42.153-43.383L480-779.999l170.767 170.768-42.153 43.383-98.615-98.615v336.001h-59.998ZM252.309-180.001q-30.308 0-51.308-21t-21-51.308v-108.46H240v108.46q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h455.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-108.46h59.999v108.46q0 30.308-21 51.308t-51.308 21H252.309Z" />
    </svg>
  );
};
