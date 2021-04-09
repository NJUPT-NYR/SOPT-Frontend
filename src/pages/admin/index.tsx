import React from "react";
import type { Column } from "react-table";
import { Scaffold, Card, Descriptions, Tabs, Table } from "@/components";
import { useInstantModel } from "@/utils/hooks";
import * as model from "@/utils/model";
import { ISlimTorrent } from "@/utils/interface";

export default function Admin() {
  return (
    <Scaffold title="Admin">
      <Card className="mt-5 ">
        <Descriptions title="Admin" />
        <Tabs defaultactiveValue="1">
          <Tabs.Pane tab="Torrent" value="1">
            <AdminTorrent />
          </Tabs.Pane>
          <Tabs.Pane tab="User" value="2">
            <AdminUser />
          </Tabs.Pane>
          <Tabs.Pane tab="Site" value="3">
            <AdminSite />
          </Tabs.Pane>
        </Tabs>
      </Card>
    </Scaffold>
  );
}

const InvisibleTorrentsColumns: Column<ISlimTorrent>[] = [
  {
    Header: "Id",
    accessor(row) {
      return <div className="text-gray-600 text-center">{row?.id ?? "-"}</div>;
    },
    width: 100,
  },
  {
    Header: "Title",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">{row?.title ?? "-"}</div>
      );
    },
    width: 100,
  },
  {
    Header: "Poster",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">{row?.poster ?? "-"}</div>
      );
    },
    width: 100,
  },
  {
    Header: "Tag",
    accessor(row) {
      return <div className="text-gray-600 text-center">{row?.tag ?? "-"}</div>;
    },
    width: 100,
  },
  {
    Header: "LastEdit",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">{row?.lastEdit ?? "-"}</div>
      );
    },
    width: 100,
  },
  {
    Header: "Length",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">{row?.length ?? "-"}</div>
      );
    },
    width: 100,
  },
  {
    Header: "Free",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">{row?.free ?? "-"}</div>
      );
    },
    width: 100,
  },
  {
    Header: "Downloading",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">
          {row?.downloading ?? "-"}
        </div>
      );
    },
    width: 100,
  },
  {
    Header: "Uploading",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">{row?.uploading ?? "-"}</div>
      );
    },
    width: 100,
  },
  {
    Header: "Finished",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">{row?.uploading ?? "-"}</div>
      );
    },
    width: 100,
  },
];

function AdminTorrent() {
  const { data } = useInstantModel([
    model.requestAdminTorrentShowInvisibleTorrents,
  ]);

  return (
    <div>
      <h2 className="text-2xl mt-5">Invisible Torrents</h2>
      <div className="overflow-scroll mt-3">
        <Table
          columns={InvisibleTorrentsColumns}
          data={data ?? []}
          empty={<div className="text-center my-4 mx-2">Empty</div>}
        />
      </div>
    </div>
  );
}

function AdminUser() {
  return <div>user</div>;
}

function AdminSite() {
  return <div>site</div>;
}
