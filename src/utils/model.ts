import type { AxiosInstance } from "axios";
import qs from "query-string";

export interface IRequestTorrentList {
  freeonly: boolean;
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
