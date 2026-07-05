"use client";
import React, { memo, useState } from "react";
import { FaPlus } from "react-icons/fa6";

interface props {
  id: string | null;
  title: string | null;
  value: string | number | "";
  disabled: boolean;
  setValue: (inp_value: string) => void;
  align_text: string | null;
  name: string;
  placeholder: string;
}

function InputAdder({
  id,
  title,
  disabled,
  setValue,
  align_text,
  name,
  placeholder,
}: props) {
  const [value_inp, setValue_inp] = useState("");

  return (
    <div className="w-full flex flex-col items-start justify-end gap-2 relative">
      <label
        className="text-textColorTheme w-full font-bold text-start"
        htmlFor={id ? id : ""}
      >
        {title}
      </label>
      <input
        placeholder={placeholder}
        className={`w-full font-bold rounded-lg bg-backgroundColorTheme_2 shadow-inputing text-${
          disabled === true ? "colorTheme" : "textColorTheme"
        } text-${align_text} bg-backgroundColorTheme_1 transition-all duration-300 py-[10px] px-3 focus:shadow-colorTheme placeholder:text-[#55555576]`}
        disabled={disabled}
        value={value_inp}
        onChange={(e) => {
          setValue_inp(e.target.value);
        }}
        type="text"
        name={name}
        id={id ? id : ""}
      />
      {value_inp ? (
        <button
          onClick={() => {
            setValue(value_inp);
            setValue_inp("")
          }}
          className={`absolute ${
            align_text === "start" ? "left-0" : "right-0"
          } bottom-0 p-[7px] rounded-md`}
        >
          <FaPlus className="text-white bg-colorTheme p-2 rounded-md w-[30px] h-[30px] shadow-ghost shadow-colorTheme" />
        </button>
      ) : null}
    </div>
  );
}

export default memo(InputAdder);
