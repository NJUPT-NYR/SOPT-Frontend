import React from "react";
import type { Context } from "koa";
import { Helmet } from "react-helmet";

import { Link } from "@/components";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";
import { ksGif } from "@/assets";

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
          <div className={styles.text}>go to profile</div>
        </Link>
        <div className="text-red-600">hello</div>
        <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
          <div className="ml-6 pt-1">
            <h4 className="text-xl text-gray-900 leading-tight">ChitChat</h4>
            <p className="text-base text-gray-600 leading-normal">
              You have a new message!
            </p>
          </div>
        </div>
        <img src={ksGif} />
      </div>
    );
  }
}
