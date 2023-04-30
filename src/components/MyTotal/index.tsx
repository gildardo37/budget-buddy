import { PurchaseItem } from "@/types";
import React from "react";

interface Props {
  purchases: PurchaseItem[];
}

export const MyTotal: React.FC<Props> = ({ purchases }) => {
  const totalPurchases = purchases.reduce((acc, item) => acc + item.ammount, 0);

  return (
    <h3 className="text-center p-4 font-bold">
      Total spent:
      <span className="font-normal pl-2">${totalPurchases}</span>
    </h3>
  );
};
