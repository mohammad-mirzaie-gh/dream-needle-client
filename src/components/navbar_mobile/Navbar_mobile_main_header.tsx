import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { PiDress } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import Buttons_acount from "@/components/buttons/Buttons_acount";
import Link from "next/link";
import Icon_count_carts from "../utils/Icon_count_carts";

function Navbar_mobile_main_header() {
  return (
    <nav className="fixed bottom-0 mx-auto w-full bg-backgroundColorTheme_1 lg:hidden flex flex-row justify-center items-center z-50">
      <ul className="py-[10px] flex flex-row justify-around items-center max-w-[1700px] sm:gap-5 gap-3 w-full">
        <li className="w-[20%] flex flex-col-reverse gap-1 justify-start items-center">
          <span className="text-textColorTheme text-[10px] font-medium">
            دسته‌بندی
          </span>
          <div>
            <TbCategory className="text-colorTheme" size={27} />
          </div>
        </li>
        <Link href={"/cart"} className="w-[20%] flex flex-col-reverse gap-1 justify-start items-center">
          <span className="text-textColorTheme text-[10px] font-medium">
            سبدخرید
          </span>
          <div>
            <Icon_count_carts size={27} />
          </div>
        </Link>
        <Link
          href={"/shop"}
          className="w-[20%] flex flex-col-reverse gap-1 justify-start items-center"
        >
          <span className="text-textColorTheme text-[10px] font-medium">
            محصولات
          </span>
          <div>
            <PiDress className="text-colorTheme" size={27} />
          </div>
        </Link>
        <Link href={"/shop?discount=true"} className="w-[20%] flex flex-col-reverse gap-1 justify-start items-center">
          <span className="text-textColorTheme text-[10px] font-medium">
            تخفیف دار
          </span>
          <div>
            <MdOutlineLocalOffer className="text-colorTheme" size={27} />
          </div>
        </Link>
        <Buttons_acount />
      </ul>
    </nav>
  );
}

export default Navbar_mobile_main_header;
