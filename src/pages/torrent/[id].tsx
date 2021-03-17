import { Scaffold } from "@/components";
import { GetServerSideProps } from "next";
import React from "react";

import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";

interface ITorrentDetail {
  id: number;
  title: string;
  poster: string;
  intro: string;
}

export default function TorrentDetail({
  id,
  intro,
  poster,
  title,
}: ITorrentDetail) {
  return (
    <Scaffold title="Detail">
      <div className="w-full h-full bg-gray-50 pt-14">
        <div className="mx-auto max-w-9/10-screen ">
          <div className="w-full rounded-lg shadow-sm bg-white py-4 px-6">
            <div className="text-2xl font-bold ">INFO</div>
            <h2 className="text-xl">{title}</h2>
            <div>id: {id}</div>
            <div>poster: {poster}</div>
          </div>
          <div className="mt-5 w-full rounded-lg shadow-sm bg-white py-4 px-6 markdown-body">
            <div className="text-2xl font-bold">INTRO</div>
            <ReactMarkdown>{intro}</ReactMarkdown>
          </div>
          <div className="mt-5 w-full rounded-lg shadow-sm bg-white py-4 px-6 markdown-body">
            <div className="text-2xl font-bold">COMMENT</div>
            <div>comment list</div>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id: id,
      title: "Nekopara [SUB][1080P] [ENGLISH]",
      poster: "Donna Harris",
      intro: `## 常见问题

      1. 表格测试
      
      | Tables        |      Are      |  Cool |
      | ------------- | :-----------: | ----: |
      | col 3 is      | right-aligned | $1600 |
      | col 2 is      |   centered    |   $12 |
      | zebra stripes |   are neat    |    $1 |
      
      2. 测试 2
      
      I just love **bold text**.`,
    },
  };
};
