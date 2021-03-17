import React from "react";
import { AiFillEdit } from "react-icons/ai";

import { Scaffold } from "@/components";
import "github-markdown-css/github-markdown.css";

import HelpDoc from "../../docs/help.mdx";

export default function Help() {
  return (
    <Scaffold title="Help">
      <div className="w-full h-full bg-gray-50 overflow-hidden">
        <div className="container mx-auto rounded-lg shadow-md bg-white my-10 pt-8 pb-10 px-6  relative ">
          <span className="absolute right-5 top-5 cursor-pointer  ">
            <a href="https://github.com/NJUPT-NYR/SOPT-Frontend/edit/master/src/docs/help.mdx">
              <AiFillEdit />
            </a>
          </span>
          <div className="markdown-body">
            <HelpDoc />
          </div>
        </div>
      </div>
    </Scaffold>
  );
}
