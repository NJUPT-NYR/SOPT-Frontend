import React from "react";
import { Helmet } from "react-helmet";
import { Navigation, Footer } from "@/components";

interface IScaffold {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export default function Scaffold({ children, title }: IScaffold) {
  return (
    <div className="min-h-screen grid grid-rows-scaffold">
      <Helmet>
        <title>{title ? title + "|NYR" : "NYR"}</title>
      </Helmet>
      <div>
        <Navigation />
        {children}
      </div>
      <Footer />
    </div>
  );
}
