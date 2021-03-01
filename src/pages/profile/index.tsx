import React from "react";
import type { Context } from "koa";
import { Link, Scaffold } from "@/components";
import { GoMarkGithub } from "react-icons/go";
import { AUTH_ROLES } from "@/utils/constants";

export default function Profile() {
  return (
    <Scaffold title="Profile">
      <div className="container mx-auto flex flex-col items-center pt-40">
        <div className="mt-40 text-gray-500 text-lg">This Profile Page</div>
      </div>
    </Scaffold>
  );
}
