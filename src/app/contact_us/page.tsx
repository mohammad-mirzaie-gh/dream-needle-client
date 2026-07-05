import Footer_main from "@/components/footer/Footer_main";
import Header_main from "@/components/header/Header_main";
import Navbar_mobile_main_header from "@/components/navbar_mobile/Navbar_mobile_main_header";
import Image from "next/image";
import React from "react";
import Working from "../../../public/image/working/working.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارتباط با ما | سوزن رویا",
  description:
    "در این صفحه شما به صورت کامل با روش های ارباط گیری با مدیران سوزن رویا اشنا میشوید",
  keywords: [
    "فروشگاه اینترنتی بافت",
    "لباس بافت",
    "بافت",
    "بهترین مطالب بافتنی",
    "مطالب بافتنی",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://dream-needle.ir/contact_us",
  },
  openGraph: {
    title: "ارتباط با ما فروشگاه سوزن رویا",
    description: "در این صفحه شما به صورت کامل با روش های ارباط گیری با مدیران سوزن رویا اشنا میشوید",
    url: "https://dream-needle.ir/contact_us",
    siteName: "فروشگاه سوزن رویا",
    locale: "fa_IR",
    type: "website",
  },
};

function page() {
  return (
    <div className="flex relative flex-col justify-between items-center w-full min-h-[100dvh] bg-backgroundColorTheme_2 text-textColorTheme">
      <Header_main />
      <Navbar_mobile_main_header />
      <div className="w-full text-center my-10">
        <div className="max-w-[400px] mx-auto">
          <Image src={Working} alt="تصویر در حال کار" />
        </div>
        <p className="md:text-base text-sm px-2">این قسمت توسط برنامه نویسان در حال توسعه میباشد لطفا صبور باشید</p>
      </div>
      <Footer_main />
    </div>
  );
}

export default page;
