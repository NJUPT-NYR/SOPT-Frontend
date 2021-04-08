import classNames from "classnames";
import React from "react";
import { IBaseComponent } from "../base";

interface IHover extends IBaseComponent {}

export default function Hover({ className, ...rest }: IHover) {
  return (
    <div
      className={classNames(
        "fixed z-10 top-0 left-0 w-screen h-screen",
        className
      )}
      {...rest}
    />
  );
}
