import React from "react";

interface Props {
  color?: string;
}

export const NotVisibleIcon: React.FC<Props> = ({ color = "black" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path
        fill={color}
        d="M630.922-441.078 586-486q10.231-53.385-28.077-91.077T466-606l-44.922-44.922q13.923-6.462 28.653-9.308 14.731-2.846 30.269-2.846 68.076 0 115.576 47.5T643.076-500q0 15.538-2.654 30.269-2.654 14.73-9.5 28.653Zm127.231 124.462L714-358q38-29 68-64.5t50-77.5q-50-101-144.5-160.5T480-720q-29 0-56.5 4T368-704l-46.614-46.614q38.153-15.077 77.807-22.231 39.653-7.154 80.807-7.154 128.922 0 236.845 67t166 181.307q4 7.615 5.807 15.346 1.808 7.731 1.808 16.346t-1.5 16.346q-1.5 7.731-5.5 15.346-21.231 45.154-53.308 83.384-32.076 38.231-71.999 68.308ZM480-220.001q-126.307 0-231.537-67.5-105.231-67.5-167.308-177.807-5-7.615-7.307-16.538Q71.54-490.769 71.54-500t2-17.846q2-8.615 7-16.846 22.308-40.769 50.539-77.654t64.923-66.115l-90.308-90.924q-8.308-8.923-8.192-21.192.115-12.269 8.807-20.961 8.692-8.692 21.077-8.692 12.384 0 21.076 8.692l663.076 663.076q8.307 8.307 8.807 20.576t-8.807 21.577q-8.692 8.692-21.077 8.692-12.384 0-21.076-8.692L628.616-245.848q-35.385 13.693-72.731 19.77T480-220.001ZM238.155-636.309q-35.154 27.154-63.193 61.424Q146.923-540.616 128-500q50 101 144.5 160.5T480-280q25.77 0 50.732-3.462 24.962-3.461 49.577-10.692l-50.616-51.847q-12.154 5.307-24.27 7.192-12.115 1.885-25.423 1.885-68.076 0-115.576-47.5T316.924-500q0-13.308 2.077-25.423 2.077-12.116 7-24.27l-87.846-86.616ZM541-531Zm-131.768 65.769Z"
      />
    </svg>
  );
};