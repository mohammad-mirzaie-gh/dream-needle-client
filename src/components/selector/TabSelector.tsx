"use client";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { TbMessage2Question } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";

import React, { ReactNode, useState } from "react";
function TabSelector({
  child1,
  child2,
  child3,
}: {
  child1: ReactNode;
  child2: ReactNode;
  child3: ReactNode;
}) {
  const [tab, setTab] = useState<
    "questions_and_answers" | "description" | "comments"
  >("description");
  return (
    <div className="w-full felx justify-start items-start">
      <div className="flex flex-row justify-start items-center gap-3 overflow-x-auto w-full p-1 sidbar_panel">
        <button
          onClick={() => setTab("description")}
          className={`flex flex-row sm:justify-center justify-start items-center sm:gap-2 gap-1 p-2 py-1 rounded-md ${
            tab === "description"
              ? "bg-backgroundColorTheme_2 shadow-boxing shadow-colorTheme"
              : "bg-backgroundColorTheme_1"
          }`}
        >
          <HiOutlineClipboardDocumentList
            className="text-colorTheme"
            size={25}
          />
          <h4
            className={`font-lalezarFont text-lg max-sm:text-sm  min-w-max ${
              tab === "description" ? "text-colorTheme" : ""
            }`}
          >
            توضیحات تکمیلی
          </h4>
        </button>
        <button
          onClick={() => setTab("comments")}
          className={`flex flex-row sm:justify-center justify-start items-center sm:gap-2 gap-1 p-2 py-1 rounded-md ${
            tab === "comments"
              ? "bg-backgroundColorTheme_2 shadow-boxing shadow-colorTheme"
              : "bg-backgroundColorTheme_1"
          }`}
        >
          <BiCommentDetail className="text-colorTheme" size={25} />
          <h4
            className={`font-lalezarFont text-lg max-sm:text-sm  min-w-max ${
              tab === "comments" ? "text-colorTheme" : ""
            }`}
          >
            نظرات کاربران
          </h4>
        </button>
        <button
          onClick={() => setTab("questions_and_answers")}
          className={`flex flex-row sm:justify-center justify-start items-center sm:gap-2 gap-1 p-2 py-1 rounded-md ${
            tab === "questions_and_answers"
              ? "bg-backgroundColorTheme_2 shadow-boxing shadow-colorTheme"
              : "bg-backgroundColorTheme_1"
          }`}
        >
          <TbMessage2Question className="text-colorTheme" size={25} />
          <h4
            className={`font-lalezarFont text-lg max-sm:text-sm  min-w-max ${
              tab === "questions_and_answers" ? "text-colorTheme" : ""
            }`}
          >
            پرسش و پاسخ
          </h4>
        </button>
      </div>
      <div className=" my-5">
        {tab === "description" ? child1 : tab === "comments" ? child2 : child3}
      </div>
    </div>
  );
}

export default TabSelector;
