import React, { useCallback, useEffect, useRef } from "react";
import { Link, Scaffold, Card, Descriptions } from "@/components";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { RiImageEditFill } from "react-icons/ri";

interface IProfile {
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
  inviter,
}: IProfile) {
  const router = useRouter();

  const avatarRef = useRef(null);
  useEffect(() => {
    // router.push("/login");
  }, []);

  const handleLogout = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleChangeAvatar = useCallback((event) => {
    console.log(event);
  }, []);

  return (
    <Scaffold title="Profile">
      <div className="grid md:grid-cols-1fr-3fr pt-10 px-5">
        <div className="flex flex-col items-center">
          <div className="relative" style={{ clipPath: "circle(50%)" }}>
            <img className=" rounded-full" src={avatar} />
            <input
              className="hidden"
              type="file"
              ref={avatarRef}
              onChange={handleChangeAvatar}
            />
            <div
              className="absolute w-full h-full top-0 left-0 z-10 cursor-pointer bg-black opacity-0 hover:opacity-40 flex items-center justify-center"
              onClick={() => {
                avatarRef.current?.click?.();
              }}
            >
              <div>
                <RiImageEditFill className="text-gray-100 bg-black text-5xl" />
              </div>
            </div>
          </div>
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
            className="mt-5 w-full rounded-md bg-gray-100 hover:bg-gray-200 text-center text-red-700 py-2 cursor-pointer transition-all ease-in-out select-none font-semibold "
            onClick={handleLogout}
          >
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
