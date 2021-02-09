import React from "react";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";
import type { Context } from "koa";
import { Helmet } from "react-helmet";

interface IProfileProps {
  name: string;
}

@Page("/profile")
export default class Profile extends BasicServerPage<IProfileProps, null> {
  static getInitPageProps(ctx: Context) {
    return Promise.resolve({ name: "cattchen" });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Profile page</title>
        </Helmet>
        <div>profile page</div>
        <div>name: {this.props.name}</div>
      </div>
    );
  }
}
