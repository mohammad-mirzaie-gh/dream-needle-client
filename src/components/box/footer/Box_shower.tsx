import React from "react";
import { IconType } from "react-icons/lib";

function Box_shower({
  head,
  description,
  Icon,
  href,
}: {
  head: string;
  description: string;
  Icon: IconType;
  href?: string;
}) {
  return (
    <>
      {href ? (
        <a
          href={href}
          className="flex sm:flex-row flex-col justify-center items-center cursor-pointer sm:gap-3 gap-1"
        >
          <div className="p-2 bg-backgroundColorTheme_2 rounded-md">
            <Icon size={27} className="text-colorTheme" />
          </div>
          <div className="flex flex-col justify-center sm:items-start items-center gap-[2px]">
            <h3 className="font-shabnamFont md:text-xl text-base font-semibold">
              {head}
            </h3>
            <p className="md:text-xs text-[11px] font-semibold max-sm:text-center">
              {description}
            </p>
          </div>
        </a>
      ) : (
        <div className="flex sm:flex-row flex-col justify-center items-center cursor-pointer sm:gap-3 gap-1">
          <div className="p-2 bg-backgroundColorTheme_2 rounded-md">
            <Icon size={27} className="text-colorTheme" />
          </div>
          <div className="flex flex-col justify-center sm:items-start items-center gap-[2px]">
            <h3 className="font-shabnamFont md:text-xl text-base font-semibold">
              {head}
            </h3>
            <p className="md:text-xs text-[11px] font-semibold max-sm:text-center">
              {description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Box_shower;
