import React, { useState } from "react";
import { IBaseComponent } from "../base";
import { AiOutlineCaretDown } from "react-icons/ai";
import classNames from "classnames";

interface ISelect<T> extends IBaseComponent {
  value: T;
  options: {
    label: React.ReactNode;
    value: T;
    isSelected?: (value: T) => boolean;
  }[];
  onChange?: (nextValue: T) => void;
}

export default function Select<T>({
  value,
  options,
  onChange,
  ...rest
}: ISelect<T>) {
  const [isUnfold, setIsUnfold] = useState(false);
  const { label } =
    options.find((one) =>
      one?.isSelected ? one.isSelected(value) : one.value === value
    ) ?? {};

  return (
    <>
      <div className="relative z-20 inline-block" {...rest}>
        <span
          className={classNames(
            "bg-gray-50 hover:bg-gray-100 border-2 border-gray-100  rounded-md shadow-sm px-4 py-2 select-none inline-flex items-center cursor-pointer ",
            isUnfold && "bg-gray-100"
          )}
          onClick={() => {
            setIsUnfold((isUnfold) => !isUnfold);
          }}
        >
          <span>{label}</span>
          <span>
            <AiOutlineCaretDown className="text-gray-600" />
          </span>
        </span>
        <div
          className={classNames(
            "rounded-xl absolute bg-white mt-2 border-gray-100 border-2 overflow-hidden min-w-10 z-20",
            !isUnfold && "hidden"
          )}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={classNames(
                "px-4 py-2 text-center hover:bg-gray-100 cursor-pointer select-none ",
                index !== options.length - 1 && "border-b-2"
              )}
              onClick={() => {
                onChange?.(option.value);
                setIsUnfold(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div
        className={classNames(
          "fixed z-10 top-0 left-0 w-screen h-screen",
          !isUnfold && "hidden"
        )}
        onClick={() => {
          setIsUnfold(false);
        }}
      ></div>
    </>
  );
}
