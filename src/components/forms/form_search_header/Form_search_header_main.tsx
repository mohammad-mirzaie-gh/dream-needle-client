"use client";

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

function Form_search_header_main() {
  const [search, setSearch] = useState("");

  return (
    <search className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="relative w-full"
      >
        <input
          placeholder={`جست و جو محصولات`}
          className={`w-full font-bold rounded-lg bg-backgroundColorTheme_2 focus:shadow-ghost text-colorTheme text-start transition-all duration-300 py-[10px] px-3 focus:shadow-colorTheme placeholder:text-[#73737376]`}
          disabled={false}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name={"search"}
          id={""}
        />
        {search ? (
          <button
            onClick={() => {}}
            className={`absolute ${
              "start" === "start" ? "left-0" : "right-0"
            } bottom-0 p-[7px] rounded-md`}
          >
            <IoSearch className="text-white bg-colorTheme p-2 rounded-md w-[30px] h-[30px] shadow-ghost shadow-colorTheme" />
          </button>
        ) : null}
      </form>
    </search>
  );
}

export default Form_search_header_main;
