import classNames from "classnames";
import React from "react";
import { IBaseComponent } from "../base";

interface IBadge extends IBaseComponent {
  name: React.ReactNode;
  value: React.ReactNode;
  colorKey: string;
}

const Colors = [
  "bg-green-500",
  "bg-gray-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

export default function Badge({
  colorKey,
  name,
  value,
  className,
  ...rest
}: IBadge) {
  return (
    <div
      className={classNames(
        "overflow-hidden inline-flex shadow-sm m-1",
        className
      )}
      {...rest}
    >
      <div className=" rounded-l-md flex items-center justify-center bg-gray-600 text-white px-2 py-1">
        {name}
      </div>
      <div
        className={classNames(
          " rounded-r-md flex items-center justify-center text-white px-2 py-1",
          Colors[stringHashCode(colorKey ?? "") % Colors.length]
        )}
      >
        {value}
      </div>
    </div>
  );
}

function stringHashCode(s: string) {
  return s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}
