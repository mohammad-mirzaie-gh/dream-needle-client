"use client";
import React from "react";
import toast from "react-hot-toast";

function CopyText({
  params,
  main_params,
}: {
  params: string | number;
  main_params: string | number;
}) {
  return (
    <p
      className="cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(String(main_params)).then(() => {
          toast.success("با موفقیت کپی شد");
        });
      }}
    >
      {" ... "+params}
    </p>
  );
}

export default CopyText;
