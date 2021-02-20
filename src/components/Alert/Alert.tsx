import React from "react";
import { IBaseComponent } from "../base";
import classNames from "classnames";
import styles from "./Alert.module.css";
import { GoX } from "react-icons/go";

interface IAlert extends IBaseComponent {
  type: "success" | "info" | "warning" | "error";
  showClose?: boolean;
  onClose?: () => void;
}

export default function Alert({
  children,
  className,
  type,
  showClose,
  onClose,
}: IAlert) {
  return (
    <div
      className={classNames(
        "px-2 py-1 border-solid border-2 relative ",
        styles[`login__container--${type}`],
        className,
        {
          "pr-10": showClose,
        }
      )}
    >
      {children}
      {showClose && (
        <GoX
          className="absolute right-2 top-1 w-5 text-gray-400 cursor-pointer"
          onClick={() => {
            onClose?.();
          }}
        />
      )}
    </div>
  );
}
