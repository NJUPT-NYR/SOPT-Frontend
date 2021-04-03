import React from "react";
import classNames from "classnames";
import { IBaseComponent } from "../base";
import { VscLoading } from "react-icons/vsc";

interface IButton extends IBaseComponent {
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
}

export default function Button(props: IButton) {
  const { children, className, type, isLoading, ...restProps } = props;
  return (
    <button
      className={classNames(
        className,
        "rounded-md shadow-md px-5 py-3   text-white block relative ",
        isLoading
          ? "cursor-wait bg-gray-600"
          : " cursor-pointer bg-gray-700 hover:bg-gray-600"
      )}
      type={type}
      {...restProps}
      disabled={isLoading}
    >
      {isLoading && (
        <div className="absolute z-10 w-full h-full top-0 left-0  grid place-items-center ">
          <VscLoading className="block text-white text-3xl animate-spin  " />
        </div>
      )}
      <div className={classNames({ invisible: isLoading })}>{children}</div>
    </button>
  );
}
