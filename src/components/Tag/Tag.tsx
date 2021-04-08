import classNames from "classnames";
import React from "react";
import { IBaseComponent } from "../base";
import { RiCloseFill } from "react-icons/ri";

interface ITag extends IBaseComponent {
  deletable?: boolean;
  onDelete?: () => void;
}

export default function Tag({
  deletable,
  children,
  className,
  onDelete,
  ...rest
}: ITag) {
  return (
    <div
      className={classNames(
        className,
        " relative px-2 py-1 bg-250-250-250 border-217-217-217 border-2 shadow-sm rounded-md inline-flex items-center justify-center ",
        deletable && "pr-10"
      )}
      {...rest}
    >
      <div
        className={classNames(
          "absolute right-2 top-2 cursor-pointer",
          !deletable && "hidden"
        )}
        onClick={onDelete}
      >
        <RiCloseFill />
      </div>
      {children}
    </div>
  );
}
