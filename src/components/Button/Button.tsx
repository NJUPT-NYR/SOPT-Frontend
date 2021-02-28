import React from "react";
import classNames from "classnames";
import { IBaseComponent } from "../base";

interface IButton extends IBaseComponent {}

export default function Button(props: IButton) {
  const { children, className, ...restProps } = props;
  return (
    <div
      className={classNames(
        className,
        "rounded-md shadow-md px-5 py-3 bg-gray-700 cursor-pointer hover:bg-gray-600 text-white"
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
