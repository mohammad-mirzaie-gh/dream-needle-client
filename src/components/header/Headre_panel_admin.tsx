"use client";

import React, { useState } from "react";
import Logo from "./../../../public/image/logo/logo.webp";
import Image from "next/image";
import ThemeChanger from "./../themeChanger/ThemeChanger";
import { FaRegBell } from "react-icons/fa";
import Sidbar_panel_admin from "@/components/sidbar/sidbar_panel_admin";
import { FiAlignJustify } from "react-icons/fi";

function Headre_panel_admin() {
  const [is_open, setIs_open] = useState(false);

  return (
    <>
      <div
        className={`flex fixed top-0 ${
          is_open === true ? "right-[0px] w-full" : "right-[-300px] w-[290px]"
        } flex-col justify-start items-start min-h-[100dvh] transition-all duration-300 md:hidden z-[9999]`}
      >
        <Sidbar_panel_admin setIs_open={setIs_open} />
      </div>
      <header className="w-full bg-backgroundColorTheme_1 h-[90px] px-5 flex flex-row justify-between items-center">
        <button
          className="md:hidden"
          onClick={() => {
            setIs_open(!is_open);
          }}
        >
          <FiAlignJustify size={35} className="text-colorTheme" />
        </button>
        <div className="flex flex-row justify-center items-center gap-5 max-md:hidden">
          <div className="w-[45px] h-[45px]  p-1 rounded-[50%] bg-backgroundColorTheme_2 shadow-boxing shadow-[#2563eb] flex justify-center items-center">
            <div className="p-[2px] flex justify-center items-center absolute">
              <button>
                <FaRegBell className="text-colorTheme mr-[2px]" size={20} />
              </button>
            </div>
          </div>
          <div className="w-[45px] h-[45px] p-1 rounded-[50%] bg-backgroundColorTheme_2 shadow-boxing shadow-[#2563eb] flex justify-center items-center">
            <ThemeChanger size={25} />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <Image height={60} src={Logo} alt="لوگوی سوزن رویا" />
        </div>
      </header>
    </>
  );
}

export default Headre_panel_admin;
