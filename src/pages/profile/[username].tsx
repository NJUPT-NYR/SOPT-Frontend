import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Link,
  Card,
  Descriptions,
  Scaffold,
  Input,
  Button,
  Table,
  Select,
  Tag,
} from "@/components";
import * as model from "@/utils/model";
import { RiImageEditFill } from "react-icons/ri";
import classNames from "classnames";
import {
  COOKIE_NAME_JWT_TOKEN,
  PROFILE_SIADBARS,
  PROFILE_SIADBARS_ADMIN,
} from "@/utils/constants";
import { dateFormat } from "@/utils/tools";
import { GetServerSideProps } from "next";
import { makeServerFetcher, serverDoFetch } from "@/utils/request";
import { useForm } from "react-hook-form";
import { GoTelescope } from "react-icons/go";
import { MdModeEdit, MdDone, MdAdd } from "react-icons/md";
import qs from "query-string";
import {
  useCookies,
  useJwtClaim,
  useModel,
  useInstantModel,
} from "@/utils/hooks";
import type { Column } from "react-table";
import { IInvitation } from "@/utils/interface";

interface IProfileUsername {
  username: string;
  avatar: string;
  isAdmin: boolean;
  tab: "invitations" | null;
}

export default function ProfileUsername({
  username,
  avatar,
  isAdmin,
  tab,
}: IProfileUsername) {
  const jwtClaim = useJwtClaim();
  const isOwned = useMemo(() => jwtClaim.sub === username, [
    jwtClaim,
    username,
  ]);

  let content = <ProfileUserinfo />;
  if (isOwned) {
    switch (tab) {
      case "invitations":
        content = <ProfileSendInvitation />;
        break;
    }
  }

  return (
    <Scaffold title="Profile">
      <div className="grid md:grid-cols-1fr-3fr pt-10 px-5 gap-x-2 gap-y-1">
        <div className="flex flex-col items-center">
          <ProfileAvatar
            editable={isOwned}
            avatar={avatar}
            fallbackAvatarText={"N"}
          />
          <div className="font-light text-2xl">{username}</div>
          {isOwned && (
            <>
              <ProfileSidebar items={PROFILE_SIADBARS} />
              {isAdmin && (
                <>
                  <div className="mt-1 text-gray-500 text-sm">As Admin</div>
                  <ProfileSidebar items={PROFILE_SIADBARS_ADMIN} />
                </>
              )}
            </>
          )}
        </div>
        <div>{content}</div>
      </div>
    </Scaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[COOKIE_NAME_JWT_TOKEN];
  const username = context.query.username;
  if (token?.length && username?.length) {
    const fetcher = makeServerFetcher({ token });
    const { data, error } = await serverDoFetch(fetcher, [
      model.requestUserShowUser,
      {
        username,
      },
    ]);
    if (!error && data?.username) {
      return {
        props: {
          username: data?.username,
          avatar: data?.avatar,
          isAdmin: true,
          tab: context.query.tab ?? null,
        },
      };
    }
  }
  return {
    redirect: {
      destination: "/404",
      permanent: false,
    },
  };
};

/**
 * sections
 */

function ProfileUserinfo() {
  const router = useRouter();
  const cookies = useCookies();
  const handleLogout = useCallback(() => {
    cookies.remove(COOKIE_NAME_JWT_TOKEN);
    router.push("/login");
  }, [router, cookies]);

  const jwtClaim = useJwtClaim();
  const isOwned = useMemo(() => {
    return jwtClaim.sub === router.query.username;
  }, [jwtClaim, router]);

  const param = useMemo(() => ({ username: router.query.username as string }), [
    router.query?.username,
  ]);

  const { data: userData, error } = useInstantModel([
    model.requestUserShowUser,
    param,
  ]);

  return (
    <div>
      <Card>
        <Descriptions
          title="User Info"
          layoutClassName="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
          <Descriptions.Item label="registerTime">
            <span>
              {userData?.registerTime
                ? dateFormat(
                    new Date(userData.registerTime),
                    "yyyy-MM-dd HH:mm:ss"
                  )
                : "-"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="lastActivity">
            <span>
              {userData?.lastActivity
                ? dateFormat(
                    new Date(userData.lastActivity),
                    "yyyy-MM-dd HH:mm:ss"
                  )
                : "-"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="inviter">
            <span>{userData?.invitor ?? "-"}</span>
          </Descriptions.Item>
          <Descriptions.Item label="upload">
            <span>{userData?.upload ?? "-"}</span>
          </Descriptions.Item>
          <Descriptions.Item label="download">
            <span>{userData?.download ?? "-"}</span>
          </Descriptions.Item>
          <Descriptions.Item label="money">
            <span>{userData?.money ?? "-"}</span>
          </Descriptions.Item>
          <Descriptions.Item label="rank">
            <span>{userData?.rank ?? "-"}</span>
          </Descriptions.Item>
          <Descriptions.Item className="col-start-span-2" label="passkey">
            <span>{userData?.passkey ?? "-"}</span>
          </Descriptions.Item>
          <Descriptions.Item label="email">
            <span>{userData?.email ?? "-"}</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {isOwned && (
        <>
          <ProfileUserInfoPrivacy />
          <ProfileUserTag />
          <div
            className="mt-5 w-full rounded-md bg-gray-50 hover:bg-gray-200 text-center text-red-700 py-2 cursor-pointer transition-all ease-in-out select-none font-semibold "
            onClick={handleLogout}
          >
            Logout
          </div>
        </>
      )}
    </div>
  );
}

function ProfileUserInfoPrivacy() {
  const router = useRouter();
  const param = useMemo(() => ({ username: router.query.username as string }), [
    router.query?.username,
  ]);
  const { data: userData, error } = useInstantModel([
    model.requestUserShowUser,
    param,
  ]);
  const selectOptions = useMemo(
    () => [
      {
        label: <div>Public</div>,
        value: 0,
      },
      {
        label: <div>Private</div>,
        value: 1,
        isSelected: (value) => value !== 0,
      },
    ],
    []
  );
  const { requester } = useModel([model.requestUserPersonalInfoUpdate]);

  const handlePrivacyChange = useCallback(
    async (nextValue) => {
      await requester({ info: userData?.other ?? {}, privacy: nextValue });
    },
    [userData, userData?.other]
  );

  return (
    <Card className="mt-5">
      <Descriptions title="Privacy" />
      <Select
        value={userData?.privacy}
        options={selectOptions}
        onChange={handlePrivacyChange}
      />
    </Card>
  );
}

function ProfileUserTag() {
  const router = useRouter();
  const param = useMemo(() => ({ username: router.query.username as string }), [
    router.query?.username,
  ]);
  const { data: userData, error } = useInstantModel([
    model.requestUserShowUser,
    param,
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleSwitchEditing = useCallback(() => {
    setIsEditing((value) => !value);
  }, [setIsEditing]);

  const { requester, isLoading } = useModel([
    model.requestUserPersonalInfoUpdate,
  ]);

  const tags = useMemo(() => {
    return Object.entries(userData?.other ?? {});
  }, [userData, userData?.other]);

  const { register, handleSubmit, reset } = useForm();

  const onAddTag = useCallback(
    async (formData) => {
      const nextInfo = {
        ...(userData?.other ?? {}),
        [formData.key]: formData.value,
      };
      await requester({ info: nextInfo, privacy: userData?.privacy });
      reset();
    },
    [userData]
  );

  const onDeleteTag = useCallback(
    async (key) => {
      const nextInfo = {
        ...(userData?.other ?? {}),
      };
      delete nextInfo[key];
      await requester({ info: nextInfo, privacy: userData?.privacy });
      reset();
    },
    [userData]
  );

  return (
    <Card className="mt-5 relative">
      {isEditing ? (
        <MdDone
          onClick={handleSwitchEditing}
          className="absolute top-4 right-4 cursor-pointer text-2xl  "
        />
      ) : (
        <MdModeEdit
          onClick={handleSwitchEditing}
          className="absolute top-4 right-4 cursor-pointer text-2xl "
        />
      )}
      <Descriptions title="Tags" />
      <div className="py-5">
        {!tags.length && !isEditing ? (
          <div className="flex justify-center">
            <GoTelescope className="text-9xl my-3 ml-6" />
          </div>
        ) : (
          <>
            {tags.map(([key, value]) => (
              <Tag
                className="mx-1 my-1"
                key={key?.toString() + value?.toString()}
                deletable={isEditing}
                onDelete={() => {
                  onDeleteTag(key);
                }}
              >
                <span>
                  {key}:{value}
                </span>
              </Tag>
            ))}
            {isEditing && (
              <form className="mt-4" onSubmit={handleSubmit(onAddTag)}>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-2">
                  <div>
                    <Input
                      placeholder="Key"
                      name="key"
                      inputRef={register({ required: true })}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Value"
                      name="value"
                      inputRef={register({ required: true })}
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-3"
                  type="submit"
                  isLoading={isLoading}
                >
                  <span>Add</span>
                </Button>
              </form>
            )}
          </>
        )}
      </div>
    </Card>
  );
}

const columns: Column<IInvitation>[] = [
  {
    Header: "Sender",
    accessor(row) {
      return (
        <div title={row.sender} className="text-gray-600 text-center">
          {row?.sender ?? "-"}
        </div>
      );
    },
  },
  {
    Header: "Code",
    accessor(row) {
      return (
        <div title={row.code} className="text-gray-600 text-center">
          {row.code ?? "-"}
        </div>
      );
    },
  },
  {
    Header: "Address",
    accessor(row) {
      return (
        <div title={row.address} className="text-gray-600 text-center">
          {row.address ?? "-"}
        </div>
      );
    },
  },
  {
    Header: "Usage",
    accessor(row) {
      return (
        <div className="text-gray-600 text-center">
          {String(row.usage) ?? "-"}
        </div>
      );
    },
  },
];

function ProfileSendInvitation() {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  const { data: listInvitationsData } = useInstantModel([
    model.requestInvitationListInvitations,
  ]);

  const { requester: sendInvitationRequester } = useModel([
    model.requestInvitationSendInvitation,
  ]);

  const onSubmit = useCallback(sendInvitationRequester, [setFormData]);

  return (
    <>
      <Card>
        <Descriptions title="Send Invitation"></Descriptions>
        <form
          className="grid grid-cols-2 gap-y-2 gap-x-1 "
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div>
            <Input
              placeholder="To"
              autoComplete={"off"}
              name="to"
              inputRef={register({ required: true })}
            />
          </div>
          <div>
            <Input
              placeholder="Address"
              autoComplete={"off"}
              name="address"
              inputRef={register({ required: true })}
            />
          </div>
          <div className="col-span-2">
            <Input
              placeholder="Body"
              autoComplete={"off"}
              name="body"
              inputRef={register({ required: true })}
            />
          </div>
          <Button className="col-span-2" type="submit">
            <span>Send</span>
          </Button>
        </form>
      </Card>
      <Card className="mt-5">
        <Descriptions title="Invitations"></Descriptions>
        <Table
          className="my-5"
          columns={columns}
          data={listInvitationsData ?? []}
          empty={
            <div className="flex flex-col items-center py-3 ">
              <div>
                <GoTelescope className="text-9xl my-3 ml-6" />
              </div>
              <div className="text-gray-500 ml-6">No Invitations</div>
            </div>
          }
        />
      </Card>
    </>
  );
}

/**
 * components
 */

interface IProfileAvatar {
  avatar?: string;
  fallbackAvatarText: string;
  editable?: boolean;
}

function ProfileAvatar({
  avatar,
  fallbackAvatarText,
  editable,
}: IProfileAvatar) {
  const avatarRef = useRef(null);
  const { requester } = useModel([model.requestUserUploadAvatar]);
  const router = useRouter();

  const handleChangeAvatar = useCallback(async (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const { error } = await requester(file);
      if (!error) {
        router.replace(router.asPath);
      }
    }
  }, []);

  return (
    <div className="relative w-36  " style={{ clipPath: "circle(50%)" }}>
      {avatar ? (
        <img className="rounded-full" src={"data:image/png;base64," + avatar} />
      ) : (
        <div className="rounded-full bg-white w-36 h-36 grid place-items-center ">
          <span className="text-9xl text-black">{fallbackAvatarText}</span>
        </div>
      )}
      <input
        className="hidden"
        type="file"
        ref={avatarRef}
        onChange={handleChangeAvatar}
      />
      <div
        className={classNames(
          "absolute w-full h-full top-0 left-0 z-10 bg-black opacity-0  flex items-center justify-center",
          editable && "hover:opacity-40 cursor-pointer "
        )}
        onClick={() => {
          editable && avatarRef.current?.click?.();
        }}
      >
        <div>
          <RiImageEditFill className="text-gray-100 bg-black text-5xl" />
        </div>
      </div>
    </div>
  );
}

interface IProfileSidebar {
  items: { label: string; tab: string }[];
}

function ProfileSidebar({ items }: IProfileSidebar) {
  const router = useRouter();
  return (
    <div className="overflow-hidden bg-white w-full mt-3 mb-3">
      {items.map((one, index, arr) => (
        <Link
          key={one.tab}
          href={qs.stringifyUrl(
            {
              url: router.asPath,
              query: { tab: one.tab },
            },
            {
              skipNull: true,
              skipEmptyString: true,
            }
          )}
        >
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
