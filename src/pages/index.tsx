import React, { useEffect, useMemo } from "react";
import type { Column } from "react-table";
import classNames from "classnames";
import qs from "query-string";

import { Link, Pagination, Scaffold, Search, Table } from "@/components";
import { useRouter } from "next/router";
import { IRecord, ISlimTorrent } from "@/utils/interface";
import { GoArrowDown, GoArrowUp, GoCheck } from "react-icons/go";
import { BiLink } from "react-icons/bi";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import * as model from "@/utils/model";
import { makeServerFetcher, serverDoFetch } from "@/utils/request";

const columns: Column<ISlimTorrent>[] = [
  {
    Header: "Title",
    accessor(row) {
      return (
        <div title={row.title} className="text-gray-600  text-center ">
          {row.title}
        </div>
      );
    },
    width: 500,
    maxWidth: 600,
  },
  {
    Header: "Poster",
    accessor(row) {
      return (
        <div title={row.poster} className="text-gray-600  text-center">
          {row.poster}
        </div>
      );
    },
  },
  {
    id: "downloaded",
    Header: (
      <div className="flex justify-center">
        <GoArrowDown className="text-xl" />
      </div>
    ),
    accessor(row) {
      return <div className="text-gray-600 text-center">{row.downloaded}</div>;
    },
  },
  {
    Header: "Tag",
    accessor(row) {
      return <div className="text-gray-600 text-center">{row.tag}</div>;
    },
  },
];

interface IHome {
  list?: number[];
  pagination?: number;
}

export default function Home({ list, pagination }: IHome) {
  const router = useRouter();
  const tableColumns = useMemo(() => columns, []);

  // const { data, isValidating, error } = useSWR([model.requestTorrentList]);

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
              maxPagination={100}
              currentPagination={pagination ?? 1}
              className="mt-4"
              handleCreatePath={(pagination) =>
                qs.stringifyUrl({ url: "/", query: { pagination } })
              }
            />
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pagination } = context.query;
  const fetcher = makeServerFetcher();
  const { data, error } = await serverDoFetch(fetcher, [
    model.requestTorrentList,
  ]);

  return {
    props: {
      list: error ? [] : data,
      pagination: pagination ? Number(pagination) : 1,
    },
  };
};
