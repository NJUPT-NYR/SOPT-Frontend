import { Scaffold } from "@/components";
import { GetServerSideProps } from "next";
import React from "react";

interface ITorrentEdit {
  id: number;
}

export default function TorrentEdit({ id }: ITorrentEdit) {
  return (
    <Scaffold title="Detail">
      <div>edit {id}</div>
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
