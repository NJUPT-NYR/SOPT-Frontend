import React from "react";
import classNames from "classnames";
import { IBaseComponent } from "../base";

interface IButton extends IBaseComponent {}

export default function Button(props: IButton) {
  const { children, className, ...restProps } = props;
  return (
    <div
      className={classNames(
        "rounded-md shadow-md px-5 py-3 bg-gray-400 cursor-pointer hover:bg-gray-300",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}
