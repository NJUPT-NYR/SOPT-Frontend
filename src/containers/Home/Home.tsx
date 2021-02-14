import React from "react";
import type { Context } from "koa";
import type { Column } from "react-table";
import classNames from "classnames";

import { Link, navigateTo, Scaffold, Search, Table } from "@/components";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";

import styles from "./home.module.css";
import { IRecord } from "@/utils/interface";
import { requestRecords } from "@/utils/model";
import { GoArrowDown, GoArrowUp, GoCheck } from "react-icons/go";

const columns: Column<IRecord>[] = [
  {
    Header: "Name",
    accessor(row) {
      return <span className="text-gray-600">{row.name}</span>;
    },
  },
  {
    Header: "Link",
    accessor(row) {
      return <span className="text-gray-600">{row.link}</span>;
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
    Header: <GoArrowUp className="text-xl" />,
    accessor(row) {
      return <span className="text-gray-600">{row.uploadCount}</span>;
    },
  },
  {
    id: "downloadCount",
    Header: <GoArrowDown className="text-xl" />,
    accessor(row) {
      return <span className="text-gray-600">{row.downloadCount}</span>;
    },
  },
  {
    id: "completeCount",
    Header: <GoCheck className="text-xl" />,
    accessor(row) {
      return <span className="text-gray-600">{row.completeCount}</span>;
    },
  },
];

interface IHomeProps {
  list?: number[];
  keyword?: string;
  pagination?: number;
}

interface IHomeState {}

@Page("/")
export default class Home extends BasicServerPage<IHomeProps, IHomeState> {
  static async getInitPageProps(ctx: Context) {
    const result = await requestRecords({ keyword: ctx.query.keyword });
    return { list: result.data };
  }
  render() {
    const { list } = this.props;
    return (
      <Scaffold title="Home">
        <div className={`container mx-auto flex flex-col items-center pb-32`}>
          <Search
            className={classNames(list?.length ? "mt-20" : "mt-40")}
            onSearch={(keyword: string) => {
              navigateTo(`/`, { keyword: keyword?.length ? keyword : null });
            }}
          />
          <Table
            className="mt-5"
            columns={columns}
            data={list}
            empty={
              <div className="p-5 text-center text-xl text-gray-500">
                Empty Data
              </div>
            }
          />
        </div>
      </Scaffold>
    );
  }
}
