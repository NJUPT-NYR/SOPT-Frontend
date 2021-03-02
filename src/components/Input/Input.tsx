import React from "react";
import classNames from "classnames";
import { IBaseComponent } from "../base";

interface IInput extends IBaseComponent {
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  inputRef?: any;
  isPassword?: boolean;
}

export default function Input(props: IInput) {
  const {
    placeholder,
    value,
    onInput,
    defaultValue,
    className,
    inputRef,
    name,
    isPassword,
    ...restProps
  } = props;
  return (
    <div className="mt-1 relative rounded-md shadow-sm mx-auto">
      <input
        ref={inputRef}
        name={name}
        type={isPassword ? "password" : "text"}
        className={classNames(
          "focus:ring-offset-gray-600 focus:outline-none  outline-none block pl-2 pr-2 sm:text-sm border-gray-300 rounded-md w-full",
          className
        )}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(event) => {
          onInput?.(event.target.value);
        }}
        {...restProps}
      />
    </div>
  );
}
