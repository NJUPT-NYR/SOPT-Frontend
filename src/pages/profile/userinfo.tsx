import { Card, Descriptions, ProfileScaffold } from "@/components";
import { IBaseComponent } from "@/components/base";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import cookies from "js-cookie";
import { COOKIE_NAME_JWT_TOKEN } from "@/utils/constants";
import { makeServerFetcher, serverDoFetch } from "@/utils/request";
import * as model from "@/utils/model";
import { dateFormat } from "@/utils/tools";

interface IProfileUserinfo {
  info?: {
    id: number;
    username: string;
    registerTime: string;
    lastActivity: string;
    inviter?: string;
    upload: number;
    download: number;
    money: number;
    rank: string;
    avatar?: string;
    passkey: string;
    email: string;
    privacy: number;
  };
  error?: string;
}

export default function ProfileUserinfo(props: IProfileUserinfo) {
  const {
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
  } = props?.info;
  const router = useRouter();
  const handleLogout = useCallback(() => {
    cookies.remove(COOKIE_NAME_JWT_TOKEN);
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
              <span>
                {dateFormat(new Date(registerTime), "yyyy-MM-dd HH:mm:ss")}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="lastActivity">
              <span>
                {dateFormat(new Date(lastActivity), "yyyy-MM-dd HH:mm:ss")}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="inviter">
              <span>{inviter || "No Inviter"}</span>
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
            <Descriptions.Item className="col-start-span-2" label="passkey">
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
  const token = context.req.cookies[COOKIE_NAME_JWT_TOKEN];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const fetcher = makeServerFetcher({ token });

  const { data, error } = await serverDoFetch(fetcher, [
    model.requestUserShowUser,
    { username: "cattchen" },
  ]);
  return {
    props: {
      info: data ?? null,
      error,
    },
  };
};
