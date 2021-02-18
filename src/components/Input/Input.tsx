import React from "react";
import classNames from "classnames";

interface IInput {
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
  defaultValue?: string;
  classname?: string;
}

export default function Input({
  placeholder,
  value,
  onInput,
  defaultValue,
  classname,
}: IInput) {
  return (
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        type="text"
        className={classNames(
          "focus:ring-offset-gray-600 focus:outline-none outline-none block pl-2 pr-2 sm:text-sm border-gray-300 rounded-md",
          classname
        )}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(event) => {
          onInput?.(event.target.value);
        }}
      />
    </div>
  );
}
