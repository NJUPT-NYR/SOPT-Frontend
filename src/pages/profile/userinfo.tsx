import { Card, Descriptions, ProfileScaffold } from "@/components";
import { IBaseComponent } from "@/components/base";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface IProfileUserinfo {
  username: string;
  registerTime: string;
  lastActivity: string;
  inviter?: string;
  upload: string;
  download: string;
  money: string;
  rank: string;
  avatar?: string;
  passkey: string;
  email: string;
}

export default function ProfileUserinfo({
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
  inviter,
}: IProfileUserinfo) {
  const router = useRouter();
  const handleLogout = useCallback(() => {
    router.push("/login");
  }, [router]);
  return (
    <ProfileScaffold avatar={avatar} username={username} isAdmin>
      <div>
        <Card>
          <Descriptions
            title="User Info"
            layoutClassName="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
          >
            <Descriptions.Item label="registerTime">
              <span>{registerTime}</span>
            </Descriptions.Item>
            <Descriptions.Item label="lastActivity">
              <span>{lastActivity}</span>
            </Descriptions.Item>
            <Descriptions.Item label="inviter">
              <span>{inviter}</span>
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
        <div
          className="mt-5 w-full rounded-md bg-gray-50 hover:bg-gray-200 text-center text-red-700 py-2 cursor-pointer transition-all ease-in-out select-none font-semibold "
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </ProfileScaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: "cattchen",
      registerTime: "2021-03-25 10:10:10",
      lastActivity: "2021-03-25 10:10:11",
      inviter: "Brethland",
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
