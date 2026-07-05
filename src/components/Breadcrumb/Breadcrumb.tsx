import Link from "next/link";
import React from "react";

function Breadcrumb({ data }: { data: { link: string; title: string }[] }) {
  return (
    <div className="w-full flex flex-row justify-start items-center">
      {data.map((i, index) => (
        <p
          className={`${
            data.length - 1 === index ? "text-colorTheme" : ""
          } flex flex-row justify-start items-center`}
          key={index}
        >
          <Link className="font-bold max-sm:text-xs" href={i.link}>{i.title}</Link>{" "}
            <span className="text-2xl max-sm:text-xs sm:mx-3 mx-1">
              {" > "}
            </span>
        </p>
      ))}
    </div>
  );
}

export default Breadcrumb;
