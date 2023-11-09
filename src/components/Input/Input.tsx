import React from "react";

import hidePasswordIcon from "@/assets/icons/hide.png";
import showPasswordIcon from "@/assets/icons/show.png";

interface InputProps {
  className?: string;
  placeholder?: string;
  label: string;
  error?: boolean;
  errorMsg?: string;
  type?: string;
  rows?: number;
  value: any;
  onChange: (value: any) => void;
  required?: boolean;
  min?: number;
  max?: number;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
}

export function Input({
  className,
  label,
  placeholder,
  type,
  rows,
  value,
  onChange,
  required = false,
  min,
  max,
  minlength,
  maxlength,
  pattern,
}: InputProps) {
  const [clicked, setClicked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const style =
    "font-normal rounded p-2.5 bg-slate-200 invalid:border valid:border";

  return (
    <label
      className={`${className} flex flex-col font-medium text-slate-900 text-base cursor-pointer capitalize`}
    >
      <span
        className={`${
          required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
        }`}
      >
        {label}
      </span>
      {rows && rows > 1 ? (
        <textarea
          className={`${style} ${
            clicked
              ? "invalid:border-red-500 valid:border-green-500"
              : "focus:invalid:border-red-500 focus:valid:border-green-500"
          } w-full`}
          rows={rows}
          value={value}
          placeholder={placeholder}
          minLength={minlength}
          maxLength={maxlength}
          onChange={onChange}
          required={required}
          onClick={() => setClicked(true)}
          onFocus={() => setClicked(true)}
        ></textarea>
      ) : (
        <div className="flex relative">
          <input
            className={`${style} ${
              clicked
                ? "invalid:border-red-500 valid:border-green-500"
                : "focus:invalid:border-red-500 focus:valid:border-green-500"
            } h-10 w-full`}
            type={
              type
                ? type === "password" && showPassword
                  ? "text"
                  : type
                : "text"
            }
            value={value}
            placeholder={placeholder}
            minLength={minlength}
            maxLength={maxlength}
            min={min}
            max={max}
            onChange={onChange}
            required={required}
            pattern={pattern}
            onClick={() => setClicked(true)}
            onFocus={() => setClicked(true)}
          />
          {type === "password" ? (
            <button
              className="block absolute right-[2%] mt-[5px]"
              type="button"
              onClick={() => setShowPassword(showPassword ? false : true)}
            >
              <img
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt="eye icon"
                className="w-[30px]"
              />
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </label>
  );
}