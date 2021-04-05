import type { AxiosInstance } from "axios";
import qs from "query-string";
import { IInvitation } from "./interface";

export interface IRequestTorrentList {
  freeonly?: boolean;
  tags?: string[];
  page?: number;
  sort?:
    | "Title"
    | "Poster"
    | "LastEdit"
    | "Length"
    | "Downloading"
    | "Uploading"
    | "Finished";
  type?: "Asc" | "Desc";
}

export const requestTorrentList = (
  instance: AxiosInstance,
  param: IRequestTorrentList
) =>
  instance.get(
    qs.stringifyUrl({
      url: "/torrent/list_torrents",
      query: {
        ...param,
      },
    })
  );

interface IRequestUserLogin {
  username: string;
  password: string;
}

export const requestUserLogin = (
  instance: AxiosInstance,
  { username, password }: IRequestUserLogin
) => instance.post("/user/login", { username, password });

interface IRequestUserAddUser {
  email: string;
  username: string;
  password: string;
  invite_code?: string;
}

export const requestUserAddUser = (
  instance: AxiosInstance,
  data: IRequestUserAddUser
) => instance.post("/user/add_user", data);

interface IRequestUserShowUser {
  username?: string;
}

export const requestUserShowUser = (
  instance: AxiosInstance,
  param: IRequestUserShowUser
) =>
  instance.get(
    qs.stringifyUrl({ url: "/user/show_user", query: { ...param } })
  );

/**
 * client side only
 * @param {AxiosInstance} instance
 * @param {IRequestUserUploadAvatar} param1
 */
export const requestUserUploadAvatar = (
  instance: AxiosInstance,
  file: File
) => {
  const data = new FormData();
  data.append("file", file);
  return instance.post("/user/upload_avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const requestInvitationListInvitations = (instance: AxiosInstance) =>
  instance.get<IInvitation[]>("/invitation/list_invitations");

interface IInvitationSendInvitaion {
  to: string;
  address: string;
  body: string;
}

export const requestInvitationSendInvitation = (
  instance: AxiosInstance,
  data: IInvitationSendInvitaion
) => instance.post("/invitation/send_invitation", data);
