import { BasicServerPage } from "@/utils";
import { Page } from "@/utils/decorator";
import React from "react";
import { Helmet } from "react-helmet";
import { GoBug, GoUnverified } from "react-icons/go";

@Page("/404")
export default class NotFound extends BasicServerPage {
  render() {
    return (
      <div className="min-h-full min-w-full">
        <Helmet>
          <title>Error 404(Not Found!!!)</title>
        </Helmet>
        <div className="flex justify-center items-center mt-40">
          <div>
            <a href="/" className="block p-2">
              <div className="text-6xl font-bold">NYR</div>
            </a>
            <div>
              <span>404.</span>
              <span className="text-gray-400 mt-3">That's an error</span>
            </div>
          </div>
          <div className="ml-7">
            <GoUnverified className="text-7xl" />
          </div>
        </div>
      </div>
    );
  }
}
