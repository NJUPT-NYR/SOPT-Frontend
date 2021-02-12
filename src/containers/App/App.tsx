import React from "react";
import "reflect-metadata";

import { Router, Route } from "@/components";
import { containers } from "@/containers";
import { fetchPageProps } from "@/utils/request";
import { urlMatch } from "@/utils";

const routes = containers.map((container) => ({
  path: Reflect.getMetadata("pagePath", container),
  component: container,
}));

interface IAppProps {
  initPath: string;
  initPageProps: any;
}

interface IAppState {
  pageProps: any;
}

export default class App extends React.Component<IAppProps, IAppState> {
  handleFetchPageProps = async (path: string) => {
    const matched = routes.find((one) => urlMatch(one.path, path).isMatched);
    if (matched.component.getInitPageProps) {
      return await fetchPageProps(path);
    } else {
      return null;
    }
  };
  render() {
    return (
      <Router
        initPageProps={this.props.initPageProps}
        initPath={this.props.initPath}
        fetchPageProps={this.handleFetchPageProps}
      >
        {routes.map((route) => {
          const CurrentComponent: any = route.component;
          return (
            <Route key={route.path} path={route.path}>
              {(props) => <CurrentComponent {...props} />}
            </Route>
          );
        })}
      </Router>
    );
  }
}
