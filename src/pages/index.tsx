import React, { useEffect, useMemo } from "react";
import type { Column } from "react-table";
import classNames from "classnames";
import qs from "query-string";

import { Link, Pagination, Scaffold, Search, Table } from "@/components";
import { useRouter } from "next/router";
import { IRecord } from "@/utils/interface";
import { GoArrowDown, GoArrowUp, GoCheck } from "react-icons/go";
import { BiLink } from "react-icons/bi";
import { GetServerSideProps } from "next";
import useSWR from "swr";

const columns: Column<IRecord>[] = [
  {
    Header: "Name",
    accessor(row) {
      return (
        <span
          title={row.name}
          className="text-gray-600 w-table-col-name overflow-hidden overflow-ellipsis"
        >
          {row.name}
        </span>
      );
    },
  },
  {
    Header: "Link",
    accessor(row) {
      return (
        <a
          href={row.link}
          title={row.link}
          className="block cursor-pointer hover:bg-gray-100 rounded-md px-5 py-2 "
        >
          <BiLink />
        </a>
      );
    },
  },
  {
    Header: "Size",
    accessor(row) {
      return <span className="text-gray-600">{row.size}</span>;
    },
  },
  {
    Header: "Date",
    accessor(row) {
      return <span className="text-gray-600">{row.date}</span>;
    },
  },
  {
    id: "uploadCount",
    Header: (
      <div className="flex justify-center">
        <GoArrowUp className="text-xl" />
      </div>
    ),
    accessor(row) {
      return <span className="text-gray-600">{row.uploadCount}</span>;
    },
  },
  {
    id: "downloadCount",
    Header: (
      <div className="flex justify-center">
        <GoArrowDown className="text-xl" />
      </div>
    ),
    accessor(row) {
      return <span className="text-gray-600">{row.downloadCount}</span>;
    },
  },
  {
    id: "completeCount",
    Header: (
      <div className="flex justify-center">
        <GoCheck className="text-xl" />
      </div>
    ),
    accessor(row) {
      return <span className="text-gray-600">{row.completeCount}</span>;
    },
  },
];

interface IHome {
  list?: number[];
  keyword?: string;
  pagination?: number;
  maxPagination?: number;
}

export default function Home({
  list,
  keyword,
  pagination,
  maxPagination,
}: IHome) {
  const router = useRouter();
  const tableColumns = useMemo(() => columns, []);

  return (
    <Scaffold title="Home">
      <div className={`container mx-auto flex flex-col items-center pb-32`}>
        <Search
          className={classNames(list?.length ? "mt-20" : "mt-40")}
          onSearch={(keyword: string) => {
            // router.push(`/`, { keyword: keyword?.length ? keyword : null });
          }}
        />
        <div className="max-w-9/10-screen">
          <Table
            className="mt-5 overflow-scroll w-full  "
            columns={tableColumns}
            data={list}
            empty={
              <div className="p-5 text-center text-xl text-gray-500">
                Empty Data
              </div>
            }
          />
          <div className="flex justify-end w-full">
            <Pagination
              maxPagination={maxPagination}
              currentPagination={pagination ?? 1}
              className="mt-4"
              handleCreatePath={(pagination) =>
                qs.stringifyUrl({ url: "/", query: { pagination, keyword } })
              }
            />
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      list: [],
      keyword: "",
      pagination: 1,
      maxPagination: 100,
    },
  };
};
