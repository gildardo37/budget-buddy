export const cleanPriceString = (priceString: string) => {
  const cleanString = priceString.replace(/[^\d.]/g, "");
  const decimalIndex = cleanString.indexOf(".");

  if (decimalIndex !== -1) {
    return (
      cleanString.slice(0, decimalIndex + 1) +
      cleanString.slice(decimalIndex + 1).replace(/\./g, "")
    );
  }

  if (cleanString.length > 1 && cleanString.startsWith("0")) {
    return cleanString.slice(1);
  }

  return cleanString === "0" ? "" : cleanString;
};

export const formatPrice = (num: string | number) => {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
