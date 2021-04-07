import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs, { StringifiableRecord } from "query-string";
import { IAccount, IInvitation, ISlimTorrent, IUser } from "./interface";

interface SoptAxiosInstance extends AxiosInstance {
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

export interface IRequestTorrentList extends StringifiableRecord {
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
  instance: SoptAxiosInstance,
  query: IRequestTorrentList
) =>
  instance.get<ISlimTorrent[]>(
    qs.stringifyUrl({
      url: "/torrent/list_torrents",
      query,
    })
  );

interface IRequestUserLogin {
  username: string;
  password: string;
}

export const requestUserLogin = (
  instance: SoptAxiosInstance,
  { username, password }: IRequestUserLogin
) => instance.post<string>("/user/login", { username, password });

interface IRequestUserAddUser {
  email: string;
  username: string;
  password: string;
  invite_code?: string;
}

export const requestUserAddUser = (
  instance: SoptAxiosInstance,
  data: IRequestUserAddUser
) => instance.post<IAccount>("/user/add_user", data);

interface IRequestUserShowUser extends StringifiableRecord {
  username?: string;
}

export const requestUserShowUser = (
  instance: SoptAxiosInstance,
  query: IRequestUserShowUser
) => instance.get<IUser>(qs.stringifyUrl({ url: "/user/show_user", query }));

export const requestUserUploadAvatar = (
  instance: SoptAxiosInstance,
  file: File
) => {
  const data = new FormData();
  data.append("file", file);
  return instance.post<IUser>("/user/upload_avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const requestInvitationListInvitations = (instance: SoptAxiosInstance) =>
  instance.get<IInvitation[]>("/invitation/list_invitations");

interface IInvitationSendInvitaion {
  to: string;
  address: string;
  body: string;
}

export const requestInvitationSendInvitation = (
  instance: SoptAxiosInstance,
  data: IInvitationSendInvitaion
) => instance.post<IInvitation>("/invitation/send_invitation", data);

interface IUserAuthForgetPassword extends StringifiableRecord {
  email: string;
}

export const requestUserAuthForgetPassword = (
  instance: SoptAxiosInstance,
  query: IUserAuthForgetPassword
) =>
  instance.get<null>(
    qs.stringifyUrl({ url: "/user/auth/forget_password", query })
  );

interface IUserPersonalInfoUpdate {
  info: any;
  privacy: number;
}

export const requestUserPersonalInfoUpdate = (
  instance: SoptAxiosInstance,
  data: IUserPersonalInfoUpdate
) => instance.post<null>("/user/personal_info_update", data);
