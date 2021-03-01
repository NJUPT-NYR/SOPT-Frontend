import React from "react";
import { GoBug, GoUnverified } from "react-icons/go";
import Head from "next/head";

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="min-h-full min-w-full">
        <Head>
          <title>Error 404(Not Found!!!)</title>
        </Head>
        <div className="flex justify-center items-center mt-40">
          <div>
            <a href="/" className="block p-2">
              <div className="text-6xl font-bold">NYR</div>
            </a>
            <div>
              <span>404.</span>
              <span className="text-gray-400 mt-3">{"That's an error"}</span>
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
