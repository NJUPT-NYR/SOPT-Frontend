import React from "react";
import { fetchPageProps } from "./request";
import type BasicServerPage from "./serverPage";

interface IWithEnsurePageProps {
  component: new (...args) => BasicServerPage;
  fallback: JSX.Element | JSX.Element[];
  initPageProps: any;
  path: string;
}

export function withEnsurePageProps({
  fallback,
  initPageProps,
  component,
  path,
}: IWithEnsurePageProps) {
  return class extends React.Component {
    state = {
      propsReady: !!initPageProps,
    };
    async componentDidMount() {
      if (!this.state.propsReady) {
        const result = await fetchPageProps(path);
        console.log(result);
      }
    }
    render() {
      if (this.state.propsReady) {
        const ServerPageComponent = component;
        return <ServerPageComponent {...initPageProps} />;
      } else {
        return fallback;
      }
    }
  };
}
