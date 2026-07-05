import ThemeChanger from "@/hooks/themeChanger/themeChanger";
import React from "react";
import Loading_def from "@/lottie/Loading_def";
function loading() {
  return (
    <>
      <ThemeChanger />
      <div className="w-full h-[100dvh] bg-backgroundColorTheme_1 flex items-center justify-center">
        <Loading_def/>
      </div>
    </>
  );
}

export default loading;
