import { ProductType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductPriceFormat from "../ProductPriceFormat";
import AddToCartButton from "../AddToCartButton";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/app/redux/counterSlice";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

interface Props{
  product:ProductType;
}

const CartProduct = ({ product }: Props) => {
  const dispatch = useDispatch();
  
  // Calculate amount safely
  const calculateAmount = (price?: number, quantity?: number) => {
    return (price || 0) * (quantity || 1);
  };

  // Get product ID safely
  const safeProductId = () => {
    return product?._id?.toString() || product?.id?.toString() || '';
  };

  const handleRemoveProduct = () => {
    const productId = safeProductId();  // Use safeProductId function
    if (productId) {
      dispatch(removeFromCart(productId));
      toast.success(`${product?.title?.substring(0, 10)}... removed successfully`);
    }
  };

  return (
    <div className=" py-6 flex sm:py-10">
      <Link
        href={{
          pathname: `/products/${safeProductId()}`,
          query: { id: product?.id },
        }}
        className=" h-24 w-24 sm:h-48 sm:w-48 border border-skyColor/30 hover:border-skyColor overflow-hidden flex items-center justify-center rounded-md"
      >
        <Image
          src={product?.images?.[0] || ''}
          alt="productImage"
          width={300}
          height={300}
          className="h-full w-full p-2 rounded-md object-contain bg-[#f7f7f7] hover:scale-110 duration-0"
        />
      </Link>
      {/*product details */}
      <div className=" ml-4 sm:ml-6 flex flex-1 flex-col justify-between">
        <div className=" relative pr-9 grid sm:grid-cols-4 sm:pr-0">
          <div className=" flex flex-col gap-1 col-span-5">
            <h3 className=" text-base font-semibold w-full">
              {product?.title.substring(0, 80)}
            </h3>
            <p className=" text-xs">
              Brand <span className=" font-medium ">{product?.brand}</span>
            </p>
            <p className=" text-xs">
              Category{" "}
              <span className=" font-medium ">{product?.category}</span>
            </p>
            <div className=" flex items-center gap-6 mt-2">
              <ProductPriceFormat
                amount={calculateAmount(product?.price, product?.quantity)}
              />
              <AddToCartButton product={product} />
            </div>
          </div>
          <div className=" mt-4 sm:mt-0  sm:pr-9">
            <div className=" absolute right-0 top-0">
              <button
                onClick={handleRemoveProduct}
                className=" p-2 text-gray-800 bg-gray-50 hover:bg-gray-100 hover:text-red-700"
              >
                <IoClose />
              </button>
            </div>
          </div>
        </div>
        <div>
          {product?.availabilityStatus && (
            <p className=" flex space-x-2 text-sm text-gray-700">
              <FaCheck className=" text-lg text-green-500 "/>{" "}
              <span>In Stock</span>
            </p>
          )}
          <div className="mt-1">
            You are Saving <ProductPriceFormat className=" text-green-500" amount={calculateAmount(
              product?.price * (product?.discountPercentage || 0) / 100,
              product?.quantity
            )} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
