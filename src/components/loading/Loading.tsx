import React from "react";

function loading({ size }: { size?: { w?: string; h?: string } }) {
  return (
    <div
      style={{ width: size?.w || "40px", height: size?.h || "40px" }}
      className={`loadingCircleLoading min-w-9 min-h-9 border-colorTheme`}
    ></div>
  );
}

export default loading;
