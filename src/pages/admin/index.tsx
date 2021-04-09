import React from "react";
import { Scaffold, Card, Descriptions, Tabs } from "@/components";

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

function AdminTorrent() {
  return <div>torrent</div>;
}

function AdminUser() {
  return <div>user</div>;
}

function AdminSite() {
  return <div>site</div>;
}
