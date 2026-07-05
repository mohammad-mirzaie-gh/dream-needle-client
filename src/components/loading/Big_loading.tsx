import React from "react";

function loading({ size }: { size?: { w?: string; h?: string } }) {
  return (
    <div
      style={{ width: size?.w || "80px", height: size?.h || "80px" }}
      className={`loadingCircleLoading_big min-w-9 min-h-9 border-colorTheme`}
    ></div>
  );
}

export default loading;
