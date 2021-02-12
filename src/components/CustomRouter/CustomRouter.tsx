import "reflect-metadata";
import React from "react";
import { urlMatch } from "@/utils";
import { Observer } from "@/utils";

export const PathContext = React.createContext({
  path: null,
  pageProps: null,
});
const pathObserver = new Observer();

interface IRouterProps {
  initPath: string;
  initPageProps: any;
  fetchPageProps?: (path: string) => any;
}

interface IRouterState {
  path: string;
  pageProps: any;
}

export class Router extends React.Component<IRouterProps, IRouterState> {
  state = {
    path: this.props.initPath,
    pageProps: this.props.initPageProps,
  };
  historyState = {};
  handlePathChange = async ({ path: nextPath, forward }) => {
    const nextPageProps = await this.props.fetchPageProps(nextPath);
    this.setState({ path: nextPath, pageProps: nextPageProps });
    if (forward) {
      window.history.pushState(this.historyState, nextPath, nextPath);
    }
  };
  componentDidMount() {
    pathObserver.subscribe(this.handlePathChange);
  }
  componentWillUnmount() {
    pathObserver.unsubscribe(this.handlePathChange);
  }
  render() {
    return (
      <PathContext.Provider
        value={{
          path: this.state.path,
          pageProps: this.state.pageProps,
        }}
      >
        {this.props.children}
      </PathContext.Provider>
    );
  }
}

interface IRouteProps {
  children: JSX.Element | JSX.Element | ((props: any) => JSX.Element);
  path: string;
}

export class Route extends React.Component<IRouteProps, null> {
  static contextType = PathContext;
  render() {
    const { path: currentPath, pageProps: currentPageProps } = this.context;
    if (!urlMatch(this.props.path, currentPath).isMatched) {
      return null;
    }
    if (this.props.children instanceof Function) {
      return this.props.children(currentPageProps);
    }
    return this.props.children;
  }
}

interface ILinkProps {
  to: string;
  children: JSX.Element | JSX.Element[];
  onClick?: (event: any) => void;
  className?: string;
}
export class Link extends React.Component<ILinkProps, any> {
  handleClick = (event) => {
    pathObserver.dispatch({
      path: this.props.to || "#",
      forward: true,
    });
    if (this.props?.onClick instanceof Function) {
      this.props.onClick(event);
    }
  };
  render() {
    const { to, ...rest } = this.props;
    return (
      <a onClick={this.handleClick} {...rest}>
        {this.props.children}
      </a>
    );
  }
}

export function navigateTo(path: string) {
  pathObserver.dispatch({
    path,
    forward: true,
  });
}

if (globalThis.window) {
  window.addEventListener("popstate", (event) => {
    pathObserver.dispatch({
      path: window.location.pathname,
      forward: false,
    });
  });
}
