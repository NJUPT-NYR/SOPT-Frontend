import React from "react";

import { GetServerSideProps } from "next";
import { COOKIE_NAME_JWT_TOKEN } from "@/utils/constants";

export default function Porfile() {
  return <div>Redirect to profile</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies[COOKIE_NAME_JWT_TOKEN]) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/profile/userinfo",
      permanent: false,
    },
  };
};
