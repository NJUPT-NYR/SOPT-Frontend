import { Card, Scaffold } from "@/components";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

interface ITorrentEdit {
  id: number;
  title?: string;
  description?: string;
  tag?: string[];
}

export default function Uploading({ id, title, description }: ITorrentEdit) {
  const handleEditorChange = (it: { text: string; html: string }) => {
    return it.text;
  };

  return (
    <Scaffold title="Edit">
      <div className="pt-14 mx-auto max-w-9/10-screen ">
        <Card>
          <div className="text-4xl font-normal mb-3 pb-2 ">EDIT</div>
          <div>{title}</div>
        </Card>
        <Card className="mt-5 w-full">
          <div className="text-4xl font-normal mb-3 pb-2 ">DESCRIPTION</div>
          <MdEditor
            value={description}
            onChange={handleEditorChange}
            style={{ height: "500px" }}
            renderHTML={(text) => (
              <ReactMarkdown className="markdown-body" plugins={[gfm]}>
                {text}
              </ReactMarkdown>
            )}
          />
        </Card>
      </div>
    </Scaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
      title: "New Torrent",
      description: "Write down your own description",
    },
  };
};
