"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BsSortDown } from "react-icons/bs";

function Filter_sort({ sort_code }: { sort_code: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const pusher_link_handler = (sort_coder: string) => {
    const searcher = new URLSearchParams(window.location.search);

    searcher.set("sort", sort_coder);
    const newUrl = `${pathname}?${searcher.toString()}`;

    router.push(newUrl);
  };

  const data_sort = [
    { id: 0, title: "بدون مرتب سازی", code: "0" },
    { id: 1, title: "ارزان ترین", code: "1" },
    { id: 2, title: "گران ترین", code: "2" },
    { id: 3, title: "پرفروش ترین", code: "3" },
    { id: 4, title: "جدید ترین", code: "4" },
  ];

  return (
    <div className="min-w-[500px] w-full flex flex-row justify-start items-center lg:gap-5 gap-3 lg:mb-5 mb-2 max-md:mr-[100px]">
      <div className="flex flex-row justify-center items-center gap-1">
        <BsSortDown size={25} className="text-colorTheme xs:w-[20px]" />
        <span className="sm:text-sm text-xs mt-[-3px]">مرتب سازی:</span>
      </div>
      {data_sort.map((i) => (
        <button
          key={i.id}
          onClick={() => pusher_link_handler(i.code)}
          className="flex flex-row justify-center items-center gap-1"
        >
          <span
            className={`sm:text-sm text-xs mt-[-3px] ${
              sort_code === i.code
                ? "text-colorTheme font-semibold"
                : "font-medium"
            }`}
          >
            {i.title}
          </span>
        </button>
      ))}
    </div>
  );
}

export default Filter_sort;
