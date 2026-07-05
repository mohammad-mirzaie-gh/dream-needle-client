import Header_main from "@/components/header/Header_main";
import Navbar_mobile_main_header from "@/components/navbar_mobile/Navbar_mobile_main_header";
import Footer_main from "@/components/footer/Footer_main";
import React from "react";

function page() {
  return (
    <div className="flex relative flex-col justify-between items-center w-full min-h-[100dvh] bg-backgroundColorTheme_2 text-textColorTheme h-[2000px]">
      <div className="w-full">
        <Header_main />
        <Navbar_mobile_main_header />
      </div>
      <Footer_main />
    </div>
  );
}

export default page;
