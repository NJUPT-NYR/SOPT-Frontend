import React from "react";

export interface IBaseComponent {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  onClick?: (event?: any) => void;
}
