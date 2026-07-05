"use client";
import React, { memo } from "react";

interface props {
  id: string | null;
  title: string | null;
  value: string | number | "";
  disabled: boolean;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  align_text: string | null;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: "new-password" | "on" | "off"
}

function Input({
  id,
  title,
  value,
  disabled,
  setValue,
  align_text,
  name,
  placeholder,
  type,
  autoComplete,
}: props) {
  return (
    <div className="w-full flex flex-col items-start justify-end gap-2">
      <label
        className="text-textColorTheme w-full font-bold text-start"
        htmlFor={id ? id : ""}
      >
        {title}
      </label>
      <input
        onInvalid={(e) => e.preventDefault()}
        min={0}
        autoComplete={autoComplete}
        placeholder={placeholder}
        formNoValidate
        className={`w-full font-bold rounded-lg bg-backgroundColorTheme_2 text-${
          disabled === true ? "colorTheme" : "textColorTheme"
        } text-${align_text} bg-backgroundColorTheme_1 transition-all duration-300 py-[10px] px-3 placeholder:text-[#55555576]`}
        disabled={disabled}
        value={value}
        onChange={setValue}
        type={type || "text"}
        name={name}
        id={id ? id : ""}
      />
    </div>
  );
}

export default memo(Input);
