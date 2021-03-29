import {
  Card,
  Input,
  Scaffold,
  MarkdownEditor as MdEditor,
} from "@/components";
import React, { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function Create() {
  const [editableText, setEditableText] = useState("Your New Post");
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
          <Input placeholder={"New Title"} />
        </Card>
        <Card className="mt-5 w-full">
          <div className="text-4xl font-normal mb-3 pb-2 ">Decription</div>
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
