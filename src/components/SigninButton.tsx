"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaRegUser } from "react-icons/fa";

const SigninButton = () => {
  const { data: session } = useSession()
  console.log(session);
  return (
    <>
      {session?.user ? (
        <div>
        <div onClick={()=>signOut()} className="flex items-end gap-2 text-sm cursor-pointer">
          <div className="border-2 border-gray-500 rounded-full w-10 h-10">
            <Image src={session.user.image!} height={200} width={200} alt="userImage" className=" w-full h-full rounded-full object-cover"/>
          </div>
          <div>
            <p className=" text-xm ">{session?.user?.name}</p>
            <p className="font-medium"> Logout</p>
          </div>
        </div>
      </div>
      ) : (
        <div>
      <div onClick={()=>signIn()} className="flex items-end gap-2 text-sm cursor-pointer">
        <div className="border-2 border-gray-700 p-1.5 rounded-full text-xl">
          <FaRegUser />
        </div>
        <div>
          <p className=" text-xm ">Hello Guest</p>
          <p className="font-medium"> Login / Register</p>
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default SigninButton;
