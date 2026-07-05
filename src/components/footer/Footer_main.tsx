import React from "react";
import { RiPhoneLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import { LiaTelegram } from "react-icons/lia";
import Logo from "../../../public/image/logo/logo_no_text.webp";
import Box_shower from "@/components/box/footer/Box_shower";
import Image from "next/image";
import Link from "next/link";
function Footer_main() {
  return (
    <footer className="pt-[10px] bg-backgroundColorTheme_1 w-full flex flex-col justify-between items-center gap-3 max-lg:mb-[65px]">
      <section className="flex flex-col max-w-[1700px] justify-between items-center w-full lg:px-5 xl:px-2 px-4 md:py-5 py-2 lg:gap-3 gap-4">
        <div className="w-full flex flex-row flex-wrap justify-around items-center max-md:gap-8">
          <div className="">
            <div className="flex flex-row md:justify-start justify-center items-center gap-2">
              <Image width={50} height={50} src={Logo} alt="لوگوی سوزن رویا" />
              <p className="text-colorTheme font-semibold font-lalezarFont text-3xl">
                سوزن رویا
              </p>
            </div>
            <p className="max-w-[400px] xs:text-xs text-[10px] py-3 font-semibold leading-[20px] max-md:text-center">
              فروشگاه سوزن رویا در زمینه فروش و تولید بهترین و مرغوب ترین جنس
              بافت ها فعالیت میکند , ما میکوشیم تا بهترین خدمات را در این حوزه
              به شما هم وطنان عزیز تقدیم کنیم , از این که مارا برای این کار
              انتخاب میکنید بسیار خرسندیم{" "}
            </p>
          </div>
          <div className="flex flex-row gap-10 max-md:w-full justify-center">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold max-sm:text-sm font-shabnamFont">
                سوزن رویا
              </h3>
              <Link href={"/about_us"}>
                <p className="font-semibold text-sm max-sm:text-xs">
                  درباره ما
                </p>
              </Link>
              <Link href={"/rules"}>
                <p className="font-semibold text-sm max-sm:text-xs">
                  قوانین و مقررات
                </p>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold max-sm:text-sm font-shabnamFont">
                لینک های مفید
              </h3>
              <Link href={"/contact_us"}>
                <p className="font-semibold text-sm max-sm:text-xs">
                  ارتباط با ما
                </p>
              </Link>{" "}
              <Link href={"/practical_training"}>
                <p className="font-semibold text-sm max-sm:text-xs">
                  آموزش های کاربردی
                </p>{" "}
              </Link>{" "}
              <Link href={"/suggestions_and_objections"}>
                <p className="font-semibold text-sm max-sm:text-xs">
                  پیشنهاد و اعتراضات
                </p>{" "}
              </Link>
            </div>
            <div className="sm:flex hidden flex-col gap-3">
              <h3 className="font-semibold max-sm:text-sm font-shabnamFont">
                لینک صفحات
              </h3>{" "}
              <Link href={"/shop"}>
                <p className="font-semibold text-sm max-sm:text-xs">محصولات</p>{" "}
              </Link>{" "}
              <Link href={"/blog"}>
                <p className="font-semibold text-sm max-sm:text-xs">مقالات</p>{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[100px] h-[100px] rounded-md bg-backgroundColorTheme_2 flex justify-center items-center mx-auto mb-5">
          <a
            target="_blank"
            href="https://trustseal.enamad.ir/?id=608607&Code=4zktqvckADh2VD5oBBO14PXJNHoolfiZ"
          >
            <img
              className="rounded-md w-[100px] h-[100px]"
              src="https://trustseal.enamad.ir/logo.aspx?id=608607&Code=4zktqvckADh2VD5oBBO14PXJNHoolfiZ"
              alt="لوگوی اینماد"
              style={{ cursor: "pointer" }}
            />
          </a>
        </div>
        <hr className="bg-[#555] w-full h-[1px] border-0 md:my-5 my-2" />
        <div className="w-full flex flex-col gap-5">
          <div className="flex md:flex-row flex-col justify-around md:items-center sm:items-start items-center gap-4">
            <Box_shower
              Icon={HiOutlineLocationMarker}
              head="تهران"
              description="استان تهران مرکزی چهارراه ظهیرالاسلام کوچه شهید مسعود سلطانی خیابان جمهوری اسلامی پلاک 79 طبقه 4"
            />
            <Box_shower
              href={"tel:02133925861"}
              Icon={RiPhoneLine}
              head="021-33925861"
              description="از ساعت 11:00 صبح تا 20:00 پاسخگوی شما هستیم"
            />
            <Box_shower
              href={"tel:09918209561"}
              Icon={RiPhoneLine}
              head="09918209561"
              description="از ساعت 9:00 صبح تا 19:00 پاسخگوی شما هستیم"
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-3 mt-3">
            <a
              href="https://www.instagram.com/dreamneedle_shop?igsh=MTFtYW5yZWFlMGZ3NQ=="
              className="cursor-pointer flex justify-center items-center bg-backgroundColorTheme_2 p-2 rounded-md"
            >
              <FaInstagram size={25} className="text-colorTheme" />
            </a>
            <a
              href="https://t.me/Dream_needle"
              className="cursor-pointer flex justify-center items-center bg-backgroundColorTheme_2 p-2 rounded-md"
            >
              <LiaTelegram size={25} className="text-colorTheme" />
            </a>
          </div>
        </div>
      </section>
      <p className="md:text-sm text-[10px] py-2 bg-black text-white w-full text-center">
        تمامی منابع و اطلاعات این وب سایت متعلق به فروشگاه سوزن رویا میباشد و هر
        گونه استفاده از این منابع به صورت غیرقانونی پیگرد قانونی خواهد داشت
      </p>
    </footer>
  );
}

export default Footer_main;
