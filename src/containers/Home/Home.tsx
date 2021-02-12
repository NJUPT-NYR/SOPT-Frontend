import React from "react";
import type { Context } from "koa";

import { Link, Scaffold } from "@/components";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";
import { GoMarkGithub } from "react-icons/go";

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
        <div className="container mx-auto flex flex-col items-center pt-40">
          <div className="text-black font-semibold text-4xl">NYR</div>
          <div className="mb-10">
            <GoMarkGithub className="inline-block" />
            <a
              className="ml-2 text-gray-600 "
              href="https://github.com/NJUPT-NYR/SOPT-Frontend"
            >
              https://github.com/NJUPT-NYR/SOPT-Frontend
            </a>
          </div>
          <div className="text-gray-500">
            Receive Request From {this.props.ip}
          </div>
          <Link to="/search">
            <div className="underline cursor-pointer text-green-700 ">
              Navigate To Search Page
            </div>
          </Link>
        </div>
      </Scaffold>
    );
  }
}
