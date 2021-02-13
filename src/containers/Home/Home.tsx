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

const columns: Column<IRecord>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Link",
    accessor: "link",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Upload",
    accessor: "uploadCount",
  },
  {
    Header: "Download",
    accessor: "downloadCount",
  },
  {
    Header: "Complete",
    accessor: "completeCount",
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
          <Table className="mt-5" columns={columns} data={list} />
        </div>
      </Scaffold>
    );
  }
}
