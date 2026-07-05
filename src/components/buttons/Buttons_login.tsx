"use client";

import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import React from "react";

function Buttons_login() {
  const user = useAppSelector((state) => state.userSlice.user);

  return (
    <>
      {user?.role === null ? (
        <Link href={"/authentication"} className="p-4 py-2 shadow-ghost rounded-full shadow-colorTheme">
          ورود <span className="text-[#777]">|</span> ثبت‌نام
        </Link>
      ) : user?.role === 3 ? (
        <Link href={"/user_panel"} className="p-4 py-2 shadow-ghost rounded-full shadow-colorTheme">
          حساب کاربری
        </Link>
      ) : user?.role === 2 ? (
        <Link href={"/admin_panel"} className="p-4 py-2 shadow-ghost rounded-full shadow-colorTheme">
          ادمین
        </Link>
      ) : user?.role === 1 || user?.role === 0 ? (
        <Link href={"/admin_panel"} className="p-4 py-2 shadow-ghost rounded-full shadow-colorTheme">
          مدیریت
        </Link>
      ) : "خطای شبکه"}
    </>
  );
}

export default Buttons_login;
