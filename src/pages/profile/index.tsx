import React from "react";

import { GetServerSideProps } from "next";

export default function Porfile() {
  return <div>Redirect to profile</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/profile/userinfo",
      permanent: false,
    },
  };
};
