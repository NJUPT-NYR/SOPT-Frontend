import { Scaffold } from "@/components";
import { GetServerSideProps } from "next";
import React from "react";

interface ITorrentDetail {
  id: number;
}

export default function TorrentDetail({ id }: ITorrentDetail) {
  return (
    <Scaffold title="Detail">
      <div className="w-full h-full bg-gray-50">
        <div>detail {id}</div>
      </div>
    </Scaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id: id,
    },
  };
};
