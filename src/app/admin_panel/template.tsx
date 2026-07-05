import Is_login from "@/utils/functions/getInformation/Is_login";
import Headre_panel_admin from "@/components/header/Headre_panel_admin";
import Sidbar_panel_admin from "@/components/sidbar/sidbar_panel_admin";
import { Toaster } from "react-hot-toast";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Is_login>
        <Toaster
          position="bottom-right"
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
        <div className="flex relative flex-row justify-center items-start w-full min-h-[100dvh] bg-backgroundColorTheme_2 text-textColorTheme">
          <div className="flex fixed top-0 right-0 flex-col justify-start items-start min-h-[100dvh] lg:w-[290px] md:w-[230px] max-md:hidden">
            <Sidbar_panel_admin />
          </div>
          <div className="flex flex-col justify-start items-start w-full min-h-[100dvh] lg:pr-[290px] md:pr-[230px] pr-0">
            <Headre_panel_admin />
            <section className="w-full mx-auto pt-5">{children}</section>
          </div>
        </div>
      </Is_login>
    </div>
  );
}
