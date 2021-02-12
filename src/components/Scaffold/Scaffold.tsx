import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../Navigation/Navigation";

interface IScaffold {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export default function Scaffold({ children, title }: IScaffold) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div>
        <Navigation />
        {children}
      </div>
    </>
  );
}
