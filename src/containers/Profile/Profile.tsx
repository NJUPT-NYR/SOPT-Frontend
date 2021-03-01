import React from "react";
import { Page, RequireAuth } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";
import type { Context } from "koa";
import { Link, Scaffold } from "@/components";
import { GoMarkGithub } from "react-icons/go";
import { AUTH_ROLES } from "@/utils/constants";

interface IProfileProps {
  name: string;
}

@RequireAuth([AUTH_ROLES.USER])
@Page("/profile")
export default class Profile extends BasicServerPage<IProfileProps, {}> {
  static getInitPageProps(ctx: Context) {
    return Promise.resolve({ name: "cattchen" });
  }
  render() {
    return (
      <Scaffold title="Profile">
        <div className="container mx-auto flex flex-col items-center pt-40">
          <div className="mt-40 text-gray-500 text-lg">This Profile Page</div>
        </div>
      </Scaffold>
    );
  }
}
