import React from "react";
import { Navigation, Footer } from "@/components";
import Head from "next/head";

interface IScaffold {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export default function Scaffold({ children, title }: IScaffold) {
  return (
    <div className="min-h-screen grid grid-rows-scaffold">
      <Head>
        <title>{title ? title + "|NYR" : "NYR"}</title>
      </Head>
      <div className="flex flex-col">
        <Navigation />
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
