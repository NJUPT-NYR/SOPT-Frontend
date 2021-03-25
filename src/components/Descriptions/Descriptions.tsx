import React from "react";
import { IBaseComponent } from "../base";

interface IDescriptions extends IBaseComponent {
  title?: string;
}

export default function Descriptions({
  title,
  children,
  ...rest
}: IDescriptions) {
  return (
    <div {...rest}>
      <div className="text-4xl font-normal mb-3 pb-2">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 pb-6 ">
        {children}
      </div>
    </div>
  );
}

interface IDescriptionsItem extends IBaseComponent {
  label: string;
}

Descriptions.Item = function Item({
  label,
  children,
  ...rest
}: IDescriptionsItem) {
  return (
    <div {...rest}>
      <div className="text-gray-400 text-sm">{label + ":"}</div>
      <div>{children}</div>
    </div>
  );
};
