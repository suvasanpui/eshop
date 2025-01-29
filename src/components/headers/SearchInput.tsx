"use client";
import { getData } from "@/helpers";
import { ProductType } from "@/types/type";
import { getProductId } from "@/utils/productUtils";
import { getBaseUrl } from "@/utils/singleProductUtills";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef=useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      const baseUrl = getBaseUrl();
      const endpoint = `${baseUrl}/products`;
      
      try {
        const {products} = await getData(endpoint);
        setProducts(products);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const filtered = products?.filter((items: ProductType) =>
      items?.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
    
  }, [search, products]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && 
        // @ts-expect-error - searchContainerRef.current is an HTMLElement but TypeScript doesn't recognize contains method
        !searchContainerRef.current.contains(e.target)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInputFocused]);
  return (
    <div ref={searchContainerRef} className=" hidden md:inline-flex flex-1 h-10 relative">
      <input
        type="text"
        placeholder="Search here..."
        className="w-full h-full rounded-sm border-2 border-themeColor px-4 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
      />
      {search && (
        <IoCloseSharp
          onClick={() => setSearch("")}
          className="text-xl absolute top-2.5 right-12 text-gray-500 cursor-auto hover:text-red-500 duration-200 "
        />
      )}
      <span className=" w-10 h-10 bg-themeColor/80 inline-flex items-center justify-center text-white absolute top-0 right-0 border border-themeColor hover:bg-themeColor duration-200 cursor-auto ">
        <FaSearch />
      </span>

      {filteredProducts.length > 0 ? (
        <div>
          {isInputFocused && search && (
            <div className="absolute left-0 mx-auto h-auto max-h-96 overflow-y-scroll cursor-pointer text-black top-12 w-full bg-white border-2 border-themeColor rounded-sm">
              {filteredProducts?.map((items: ProductType) => (
                <div key={(items?.id) ||(items?._id)}>
                  <Link
                    href={{
                      pathname:`/products/${getProductId(items)}`,
                      query:{id:getProductId(items)}
                    }}
                    onClick={() => setSearch("")}
                    className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer duration-200"
                  >
                    <p>{items.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="absolute top-12 w-full bg-white border-2 border-themeColor rounded-sm">
          <p className="p-2 text-center">No product found</p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
