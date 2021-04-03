import React, { useCallback, useRef } from "react";
import { IBaseComponent } from "../base";
import Scaffold from "./Scaffold";
import { RiImageEditFill } from "react-icons/ri";
import { PROFILE_SIADBARS, PROFILE_SIADBARS_ADMIN } from "@/utils/constants";
import classNames from "classnames";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import * as model from "@/utils/model";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Alert from "../Alert/Alert";

interface IProfileScaffold extends IBaseComponent {
  avatar: string;
  username: string;
  isAdmin?: boolean;
}

export default function ProfileScaffold({
  avatar,
  username,
  children,
  isAdmin,
}: IProfileScaffold) {
  const avatarRef = useRef(null);
  const [file, setFile] = useState(null);
  const { data, error, isValidating } = useSWR(
    file && [model.requestUserUploadAvatar, file]
  );

  const router = useRouter();

  const handleChangeAvatar = useCallback((event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setFile(file);
    }
  }, []);

  useEffect(() => {
    if (!isValidating && data === null) {
      router.replace(router.route);
    }
  }, [data]);

  return (
    <Scaffold title="Profile">
      {!isValidating && error && (
        <Alert className="mt-5" type="error">
          <span>{String(error)}</span>
        </Alert>
      )}
      <div className="grid md:grid-cols-1fr-3fr pt-10 px-5 gap-x-2 gap-y-1">
        <div className="flex flex-col items-center">
          <div className="relative w-36  " style={{ clipPath: "circle(50%)" }}>
            {avatar ? (
              <img
                className="rounded-full"
                src={
                  "data:image/png;base64," + avatar ||
                  "https://avatars.githubusercontent.com/u/42082890?v=4"
                }
              />
            ) : (
              <div className="rounded-full bg-white w-36 h-36 grid place-items-center ">
                <span className="text-9xl text-black">
                  {username?.toUpperCase?.()[0] ?? "N"}
                </span>
              </div>
            )}
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
          <div className="font-light text-2xl">{username}</div>
          <SideBar list={PROFILE_SIADBARS} />
          {isAdmin && (
            <>
              <div className="mt-1 text-gray-500 text-sm">As Admin</div>
              <SideBar list={PROFILE_SIADBARS_ADMIN} />
            </>
          )}
        </div>
        <div>{children}</div>
      </div>
    </Scaffold>
  );
}

interface ISideBar {
  list: { label: string; path: string }[];
}

function SideBar({ list }: ISideBar) {
  return (
    <div className="overflow-hidden bg-white w-full mt-3 mb-3">
      {list.map((one, index, arr) => (
        <Link key={one.path} href={one.path}>
          <div
            className={classNames(
              "px-5 py-3 border-t-2 border-l-2 border-r-2 cursor-pointer border-gray-200 hover:bg-gray-100 font-medium",
              index === 0 && "rounded-t-lg",
              index === arr.length - 1 && "rounded-b-lg border-b-2"
            )}
          >
            <span>{one.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}