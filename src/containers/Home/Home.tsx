import React from "react";
import type { Context } from "koa";

import { Link, Scaffold } from "@/components";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";

import styles from "./home.module.css";

interface IHomeProps {
  list: number[];
  ip: string;
}

@Page("/")
export default class Home extends BasicServerPage<IHomeProps, null> {
  static getInitPageProps(ctx: Context) {
    const ip = ctx.ip;
    return Promise.resolve({ list: [1, 2, 3], ip });
  }
  handleClick = () => {
    console.log(this.props);
  };
  render() {
    return (
      <Scaffold title="Home Page">
        <div>Receive Request From {this.props.ip}</div>
        <Link to="/profile">
          <div className="underline cursor-pointer text-green-700 ">
            Click To Profile Page
          </div>
        </Link>
      </Scaffold>
    );
  }
}
