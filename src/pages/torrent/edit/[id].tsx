import {
  Card,
  Scaffold,
  MarkdownEditor as MdEditor,
  Input,
} from "@/components";
import { GetServerSideProps } from "next";
import React, { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface ITorrentEdit {
  id: number;
  title: string;
  description?: string;
  tag?: string[];
  length?: number;
  files?: string[];
  infohash?: string;
}

export default function Edit({ id, title, description }: ITorrentEdit) {
  const [editableText, setEditableText] = useState(description);
  const handleEditorChange = useCallback(
    (event: { text: string }) => {
      setEditableText(event.text);
    },
    [setEditableText]
  );

  return (
    <Scaffold title="Edit">
      <div className="pt-14 mx-auto max-w-9/10-screen ">
        <Card>
          <div className="text-4xl font-normal mb-3 pb-2 ">Title</div>
          <Input defaultValue={title} />
        </Card>
        <Card className="mt-5 w-full">
          <div className="text-4xl font-normal mb-3 pb-2 ">Description</div>
          <MdEditor
            value={editableText}
            onChange={handleEditorChange}
            style={{ height: "500px" }}
            renderHTML={(text) => (
              <ReactMarkdown className="prose" plugins={[gfm]}>
                {text}
              </ReactMarkdown>
            )}
          />
          <div className="text-4xl font-normal mt-3 mb-3 pb-2 ">Tag</div>
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
