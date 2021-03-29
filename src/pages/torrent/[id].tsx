import { Scaffold, Card, Descriptions } from "@/components";
import { GetServerSideProps } from "next";
import React from "react";
import gfm from "remark-gfm";

import ReactMarkdown from "react-markdown";

const FAKE_INTRO = `
## 常见问题

1. 表格测试

| Left | Centre | Right |
|:-----|:------:|------:|
| 1 | 2 | 3 |


2. 测试 2

I just love **bold text**.

I just love **bold text**.

![Elaina](https://inews.gtimg.com/newsapp_bt/0/12669279686/641)
`;

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
      <div className="pt-14">
        <div className="mx-auto max-w-9/10-screen ">
          <Card>
            <Descriptions title={title}>
              <Descriptions.Item label="id">
                <span>{id}</span>
              </Descriptions.Item>
              <Descriptions.Item label="poster">
                <span>{poster}</span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card className="mt-5 w-full">
            <Descriptions title="Intro"></Descriptions>
            <ReactMarkdown className="prose w-full max-w-full" plugins={[gfm]}>
              {intro}
            </ReactMarkdown>
          </Card>
          <Card className="mt-5 w-full">
            <Descriptions title="Comments">
              <div>No Comment</div>
            </Descriptions>
          </Card>
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
      intro: FAKE_INTRO,
    },
  };
};
