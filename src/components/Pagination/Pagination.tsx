import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import classNames from "classnames";
import Link from "next/link";
import { IBaseComponent } from "../base";

interface IPagination extends IBaseComponent {
  maxPagination: number;
  currentPagination: number;
  handleCreatePath: (pagination: number) => string;
}

export default function Pagination(props: IPagination) {
  const {
    className,
    currentPagination,
    maxPagination,
    handleCreatePath,
    ...restProps
  } = props;
  const paginations = Array.from({ length: 6 })
    .map((_v, k) => currentPagination - 3 + k)
    .filter((one) => one > 0 && one <= maxPagination);
  return (
    <nav
      className={classNames(
        "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
        className
      )}
      aria-label="Pagination"
      {...restProps}
    >
      <span className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer select-none">
        <Link href={handleCreatePath(Math.max(1, currentPagination - 1))}>
          <span>
            <GoChevronLeft />
          </span>
        </Link>
      </span>
      {paginations.map((pagination) => (
        <span
          key={pagination}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer select-none"
        >
          <Link href={handleCreatePath(pagination)}>
            <span>{pagination}</span>
          </Link>
        </span>
      ))}
      <span className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer select-none">
        <Link
          href={handleCreatePath(
            Math.min(currentPagination + 1, maxPagination)
          )}
        >
          <span>
            <GoChevronRight />
          </span>
        </Link>
      </span>
    </nav>
  );
}
