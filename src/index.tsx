import React from "react";
import ReactDOM from "react-dom";
import { parserProps } from "@/utils";

import App from "@/containers/App/App";

ReactDOM.hydrate(
  <App
    initPath={location.pathname}
    initPageProps={parserProps(window.__PRERENDER_INIT_PAGE_PROPS__)}
  />,
  document.getElementById("root")
);
