import classNames from "classnames";
import React from "react";
import { IBaseComponent } from "../base";

interface ICard extends IBaseComponent {}

export default function Card({ className, children, ...rest }: ICard) {
  return (
    <div
      className={classNames(
        "w-full rounded-lg shadow-sm bg-white py-4 px-6",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
