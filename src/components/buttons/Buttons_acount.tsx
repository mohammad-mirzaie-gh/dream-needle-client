"use client";

import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { LuUserRoundCog } from "react-icons/lu";

function Buttons_acount() {
  const user = useAppSelector((state) => state.userSlice.user);

  return (
    <>
      {user?.role === 3  ? (
        <Link
        href={"/user_panel"}
        className="w-[20%] flex flex-col-reverse gap-1 justify-start items-center"
      >
        <span className="text-textColorTheme text-[10px] font-medium">
          حساب من
        </span>
        <div>
          <LuUserRoundCog className="text-colorTheme" size={27} />
        </div>
      </Link>
      ) : user?.role === 2 ? (
        <Link
          href={"/admin_panel"}
          className="w-[20%] flex flex-col-reverse gap-1 justify-start items-center"
        >
          <span className="text-textColorTheme text-[10px] font-medium">
            ادمین
          </span>
          <div>
            <LuUserRoundCog className="text-colorTheme" size={27} />
          </div>
        </Link>
      ) : user?.role === 1 || user?.role === 0 ? (
        <Link
          href={"/admin_panel"}
          className="w-[20%] flex flex-col-reverse gap-1 justify-start items-center"
        >
          <span className="text-textColorTheme text-[10px] font-medium">
            مدیریت
          </span>
          <div>
            <LuUserRoundCog className="text-colorTheme" size={27} />
          </div>
        </Link>
      ) : (
        <Link
        href={"/authentication"}
        className="w-[20%] flex flex-col-reverse gap-1 justify-start items-center"
      >
        <span className="text-textColorTheme text-[10px] font-medium">
          حساب من
        </span>
        <div>
          <LuUserRoundCog className="text-colorTheme" size={27} />
        </div>
      </Link>
      )}
    </>
  );
}

export default Buttons_acount;
