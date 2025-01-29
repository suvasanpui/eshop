import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  amount?: number;
  className?: string;
}
const ProductPriceFormat = ({ amount, className }: Props) => {
  const formatedPrice = new Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return (
    <div>
      <span className={twMerge("font-medium", className)}>{formatedPrice}</span>
    </div>
  );
};

export default ProductPriceFormat;
