"use client";
import React, { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import { navigation } from "@/constants";
import Link from "next/link";
import SocialLinks from "../SocialLinks";

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMENU() {
    setIsOpen(true);
  }
  return (
    <>
      <div
        onClick={toggleMENU}
        className=" md:hidden text-2xltext-gray-500 duration-200 hover:text-themeColor cursor-pointer"
      >
        <RiMenu3Fill />
      </div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 md:hidden text-white/80"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 flex w-screen justify-center items-center p-4 bg-black/90">
          <DialogPanel
            transition
            className="w-[94%] space-y-4 p-6 border border-lightText rounded-md absolute top-10 m-5 bg-gray-900"
          >
            <div className=" flex items-center justify-between gap-5">
              <h3 className="font-semibold text-xl">Navigation Menu</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 text-2xl hover:text-red-600 duration-300 border border-white/20 rounded-sm hover:border-white/40"
              >
                <MdClose />
              </button>
            </div>
            <div className="flex flex-col gap-5 pt-5">
                {navigation?.map((items)=>(
                    <Link key={items?.title} href={items?.href} onClick={()=>setIsOpen(false)} className=" hover:text-skyColor relative group ">
                        {items?.title}
                        <span className=" absolute w-full h-[1px] bg-white/20 left-0 -bottom-1 group-hover:bg-skyColor duration-200 "></span>
                    </Link>
                ))}
            </div>
            <SocialLinks/>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default MobileNavigation;
