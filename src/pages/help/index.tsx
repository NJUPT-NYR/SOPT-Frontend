import { Link, Scaffold } from "@/components";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { GoMarkGithub } from "react-icons/go";

interface IHelp {
  ip: string;
}

export default function Help({ ip }: IHelp) {
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
        <div className="text-gray-500">Receive Request From {ip}</div>
      </div>
    </Scaffold>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ip: "0.0.0.0",
    },
  };
}
