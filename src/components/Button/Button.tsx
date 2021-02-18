import React from "react";
import classNames from "classnames";

interface IButton {
  children?: JSX.Element;
  classname?: string;
}

export default function Button({ children, classname }: IButton) {
  return (
    <div
      className={classNames(
        "rounded-md shadow-md px-5 py-3 bg-gray-400 cursor-pointer hover:bg-gray-300",
        classname
      )}
    >
      {children}
    </div>
  );
}
