import React from "react";
import type { Context } from "koa";

export default abstract class BasicServerPage<
  TProps = any,
  TState = any
> extends React.Component<TProps, TState> {
  static getInitPageProps(ctx: Context): Promise<any> {
    return null;
  }
}
