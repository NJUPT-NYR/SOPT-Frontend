import React, { useEffect } from "react";
import { Link, Scaffold, Card, Descriptions } from "@/components";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface IProfile {
  username: string;
  registerTime: string;
  lastActivity: string;
  invitor?: string;
  upload: string;
  download: string;
  money: string;
  rank: string;
  avatar?: string;
  passkey: string;
  email: string;
}

export default function Profile({
  download,
  email,
  lastActivity,
  money,
  passkey,
  rank,
  registerTime,
  upload,
  username,
  avatar,
  invitor,
}: IProfile) {
  const router = useRouter();
  useEffect(() => {
    // router.push("/login");
  }, []);
  return (
    <Scaffold title="Profile">
      <div className="grid md:grid-cols-1fr-3fr pt-10 px-5">
        <div className="flex flex-col items-center">
          <img className="rounded-full" src={avatar} />
          <div className="font-light text-2xl">cattchen</div>
        </div>
        <div>
          <Card>
            <Descriptions title="User Info">
              <Descriptions.Item label="registerTime">
                <span>{registerTime}</span>
              </Descriptions.Item>
              <Descriptions.Item label="lastActivity">
                <span>{lastActivity}</span>
              </Descriptions.Item>
              <Descriptions.Item label="invitor">
                <span>{invitor}</span>
              </Descriptions.Item>
              <Descriptions.Item label="upload">
                <span>{upload}</span>
              </Descriptions.Item>
              <Descriptions.Item label="download">
                <span>{download}</span>
              </Descriptions.Item>
              <Descriptions.Item label="money">
                <span>{money}</span>
              </Descriptions.Item>
              <Descriptions.Item label="rank">
                <span>{rank}</span>
              </Descriptions.Item>
              <Descriptions.Item label="passkey">
                <span>{passkey}</span>
              </Descriptions.Item>
              <Descriptions.Item label="email">
                <span>{email}</span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <div className="mt-5 w-full rounded-md bg-gray-100 hover:bg-gray-200 text-center text-red-700 py-2 cursor-pointer transition-all ease-in-out select-none font-semibold ">
            Logout
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: "cattchen",
      registerTime: "2021-03-25 10:10:10",
      lastActivity: "2021-03-25 10:10:11",
      invitor: "Brethland",
      upload: "0kb",
      download: "0kb",
      money: "0",
      rank: "1",
      avatar:
        "https://cdn.jsdelivr.net/gh/ChenKS12138/ChenKS12138.github.io/static/avatar-9ebf78a88f69fda4a3b437a4f389bb51.png",
      passkey: "abc123",
      email: "cattchen@tracker.sopt.rs",
    },
  };
};
