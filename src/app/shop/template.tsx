import { Toaster } from "react-hot-toast";
import Header_main from "@/components/header/Header_main";
import Navbar_mobile_main_header from "@/components/navbar_mobile/Navbar_mobile_main_header";
import Footer_main from "@/components/footer/Footer_main";
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
        toastOptions={{
          success: {
            style: {
              boxShadow: "0 0 4px #1e8a00",
            },
          },
          error: {
            style: {
              boxShadow: "0 0 4px red",
            },
          },
          style: {
            fontFamily: "var(--vazirFont)",
            textAlign: "right",
            background: "var(--backgroundColorTheme_1)",
            color: "var(--textColorTheme)",
          },
        }}
      />
      <div className="flex relative flex-col justify-start items-center w-full min-h-[100dvh] bg-backgroundColorTheme_2 text-textColorTheme">
        <Header_main />
        <section className="w-full max-w-[1700px] mx-auto pt-5 px-5">{children}</section>
        <Navbar_mobile_main_header/>
        <Footer_main/>
      </div>
    </div>
  );
}
