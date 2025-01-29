import React from "react";
import Container from "../Container";
import { navigation } from "@/constants";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Logout from "../Logout";

const BottomHeader=async()=> {
  const session=await getServerSession();

  return (
    <div className="border-b border-b-gray-400">
      <Container className=" flex items-center justify-between py-1">
        <div className="text-xs md:text-sm font-medium flex items-center gap-2 md:gap-5 ">
          {navigation?.map((items) => (
            <Link key={items?.title} href={items?.href} className=" hover:text-themeColor duration-200 ">
              {items?.title}
            </Link>
          ))}
          {session?.user ? <Logout/> : <p className="hover:text-themeColor duration-200">
            Please signin to view your cart
          </p>}
        </div>
        <p className=" hidden md:inline-flex text-xs text-gray-400 font-medium">HelloLine: <span className=" text-black">+91 7479108631</span></p>
      </Container>
    </div>
  );
}

export default BottomHeader;
