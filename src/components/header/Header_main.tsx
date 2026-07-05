import Image from "next/image";
import React from "react";
import Logo from "./../../../public/image/logo/logo.webp";
import Logo_no_text from "./../../../public/image/logo/logo_no_text.webp";
import ThemeChanger from "../themeChanger/ThemeChanger";
import Form_search_header_main from "@/components/forms/form_search_header/Form_search_header_main";
import { IoSearch } from "react-icons/io5";
import { MdOutlineLocalOffer } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiDress } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { TbMapPinSearch } from "react-icons/tb";
import Link from "next/link";
import Buttons_login from "@/components/buttons/Buttons_login";
import { Button, Tooltip } from "@mui/material";
import Icon_count_carts from "../utils/Icon_count_carts";
function Header_main() {
  return (
    <header className="py-[10px] bg-backgroundColorTheme_1 w-full flex flex-col justify-between items-center gap-3">
      <div className="flex flex-row max-w-[1700px] justify-between items-center w-full lg:px-5 px-2 py-1 lg:gap-3 gap-4">
        <div className="flex flex-row justify-start items-center gap-5 max-lg:w-full">
          <Link className="max-lg:hidden" href={"/"}>
            <Image
              height={50}
              src={Logo}
              alt="لوگو وب سایت سوزن رویا"
              loading="eager"
            />
          </Link>
          <Link className="lg:hidden mr-3" href={"/"}>
            <Image
              height={50}
              src={Logo_no_text}
              alt="لوگو وب سایت سوزن رویا"
              loading="eager"
            />
          </Link>
          <div className="lg:w-[500px] xs:flex hidden w-full">
            <Form_search_header_main />
          </div>
        </div>
        <div className="flex flex-row justify-end items-center lg:gap-5 md:gap-4 gap-2">
          <div className="xs:hidden h-[38px] max-lg:w-[38px] p-1 rounded-md flex justify-center items-center bg-backgroundColorTheme_2">
            <IoSearch className="text-colorTheme mr-[2px]" size={20} />
          </div>
          <div className="h-[38px] max-lg:w-[38px] p-1 rounded-md flex justify-center items-center max-lg:bg-backgroundColorTheme_2">
            <ThemeChanger size={20} />
          </div>
          <Link href={"/cart"} className="max-lg:hidden">
            <Icon_count_carts size={23} />
          </Link>
          <Buttons_login />
        </div>
      </div>
      <nav className="lg:flex hidden flex-row justify-between items-center w-full max-w-[1700px] px-10">
        <div className="flex flex-row justify-start items-center">
          <ul className="flex flex-row justify-start items-center gap-5">
            <button className="flex flex-row-reverse gap-1 justify-start items-center">
              <span className="text-textColorTheme text-sm font-medium">
                دسته بندی ها
              </span>
              <div>
                <TbCategory className="text-colorTheme" size={20} />
              </div>
            </button>
            <Link
              href={"/shop"}
              className="flex flex-row-reverse gap-1 justify-start items-center"
            >
              <span className="text-textColorTheme text-sm font-medium">
                محصولات
              </span>
              <div>
                <PiDress className="text-colorTheme" size={20} />
              </div>
            </Link>
            <Link
              href={"/shop?discount=true"}
              className="flex flex-row-reverse gap-1 justify-start items-center"
            >
              <span className="text-textColorTheme text-sm font-medium">
                تخفیف دارها
              </span>
              <div>
                <MdOutlineLocalOffer className="text-colorTheme" size={20} />
              </div>
            </Link>
            <Link
              href={"/blog"}
              className="flex flex-row-reverse gap-1 justify-start items-center"
            >
              <span className="text-textColorTheme text-sm font-medium">
                مقالات
              </span>
              <div>
                <IoDocumentTextOutline className="text-colorTheme" size={20} />
              </div>
            </Link>
            <li>|</li>
            <Link href={"/contact_us"} className="text-xs  font-medium">
              سوالی دارید؟
            </Link>
            <Link href={"/practical_training"} className="text-xs  font-medium">
              آموزش های کاربردی
            </Link>
          </ul>
        </div>
        <Tooltip
          title="در حال حاضر فقط ارسال به استان های تهران و کرج را داریم"
          placement="bottom-end"
        >
          <Button>
            <div className="flex flex-row-reverse gap-1 justify-start items-center">
              <span className="text-xs font-medium text-textColorTheme">
                ارسال به شهر های ...
              </span>
              <div>
                <TbMapPinSearch className="text-colorTheme" size={15} />
              </div>
            </div>
          </Button>
        </Tooltip>
      </nav>
    </header>
  );
}

export default Header_main;
