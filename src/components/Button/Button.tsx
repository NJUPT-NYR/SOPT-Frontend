import React from "react";
import classNames from "classnames";
import { IBaseComponent } from "../base";

interface IButton extends IBaseComponent {
  type?: "submit" | "reset" | "button";
}

export default function Button(props: IButton) {
  const { children, className, type, ...restProps } = props;
  return (
    <button
      className={classNames(
        className,
        "rounded-md shadow-md px-5 py-3 bg-gray-700 cursor-pointer hover:bg-gray-600 text-white block "
      )}
      type={type}
      {...restProps}
    >
      {children}
    </button>
  );
}
