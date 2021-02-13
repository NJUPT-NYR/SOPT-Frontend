import { Link, Scaffold } from "@/components";
import { BasicServerPage } from "@/utils";
import { Page } from "@/utils/decorator";
import { Context } from "koa";
import React from "react";
import { GoMarkGithub } from "react-icons/go";

interface IHelpProps {
  ip: string;
}

@Page("/help")
export default class Help extends BasicServerPage<IHelpProps, {}> {
  static getInitPageProps(ctx: Context) {
    return Promise.resolve({ ip: ctx.ip });
  }
  render() {
    return (
      <Scaffold title="Help">
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
        </div>
      </Scaffold>
    );
  }
}
