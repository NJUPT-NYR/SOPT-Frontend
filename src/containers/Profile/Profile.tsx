import React from "react";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";
import type { Context } from "koa";
import { Scaffold } from "@/components";

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
      <Scaffold title="Profile Page">
        <div>profile page</div>
        <div>name: {this.props.name}</div>
      </Scaffold>
    );
  }
}
