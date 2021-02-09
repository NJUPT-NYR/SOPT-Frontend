import React from "react";
import type { Context } from "koa";
import { Helmet } from "react-helmet";

import { Link } from "@/components";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";

import styles from "./home.module.css";

interface IHomeProps {
  list: number[];
}

interface IHomeState {
  list: number[];
}

@Page("/")
export default class Home extends BasicServerPage<IHomeProps, IHomeState> {
  static getInitPageProps(ctx: Context) {
    return Promise.resolve({ list: [1, 2, 3] });
  }
  handleClick = () => {
    console.log(this.props);
  };
  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <div onClick={this.handleClick}>home page22</div>
        {this.props.list.map((item) => (
          <span key={item}>{item} </span>
        ))}
        <Link to="/profile">
          <div className={styles?.text ?? styles?.locals?.text}>
            go to profile
          </div>
        </Link>
      </div>
    );
  }
}
