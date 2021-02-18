import React from "react";
import "reflect-metadata";

import { Router, Route, navigateTo } from "@/components";
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
  handleFetchPageProps = async (nextPath: string) => {
    const matched = routes.find(
      (one) => urlMatch(one.path, nextPath).isMatched
    );
    if (matched.component.getInitPageProps) {
      const { data, authCheckPass } = await fetchPageProps(nextPath);
      if (!authCheckPass) {
        return { nextPath: "/login", nextPageProps: null };
      } else {
        return { nextPath, nextPageProps: data };
      }
    } else {
      return { nextPath, nextPageProps: null };
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
