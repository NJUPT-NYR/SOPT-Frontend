import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs, { StringifiableRecord } from "query-string";
import {
  IAccount,
  IInvitation,
  IPersonTorrent,
  ISlimTorrent,
  IUser,
} from "./interface";

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

export type IModel<TData = any, TParam = any> = (
  instance: SoptAxiosInstance,
  param?: TParam
) => Promise<TData>;

/**
 *  {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apitorrentlist_torrents}
 */
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

export const requestTorrentList: IModel<ISlimTorrent[], IRequestTorrentList> = (
  instance,
  query
) =>
  instance.get(
    qs.stringifyUrl({
      url: "/torrent/list_torrents",
      query,
    })
  );

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiuserlogin}
 */
interface IRequestUserLogin {
  username: string;
  password: string;
}

export const requestUserLogin: IModel<string, IRequestUserLogin> = (
  instance,
  param
) => instance.post("/user/login", param);

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiuseradd_user}
 */
interface IRequestUserAddUser {
  email: string;
  username: string;
  password: string;
  invite_code?: string;
}

export const requestUserAddUser: IModel<IAccount, IRequestUserAddUser> = (
  instance,
  data
) => instance.post("/user/add_user", data);

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiusershow_user}
 */
interface IRequestUserShowUser extends StringifiableRecord {
  username?: string;
}

export const requestUserShowUser: IModel<IUser, IRequestUserShowUser> = (
  instance,
  query
) => instance.get(qs.stringifyUrl({ url: "/user/show_user", query }));

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiuserupload_avatar}
 */
export const requestUserUploadAvatar: IModel<IUser, File> = (
  instance,
  file
) => {
  const data = new FormData();
  data.append("file", file);
  return instance.post("/user/upload_avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiinvitationlist_invitations}
 */
export const requestInvitationListInvitations: IModel<IInvitation[]> = (
  instance
) => instance.get("/invitation/list_invitations");

/**
 * {@see https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiinvitationsend_invitation}
 */
interface IInvitationSendInvitaion {
  to: string;
  address: string;
  body: string;
}

export const requestInvitationSendInvitation: IModel<
  IInvitation,
  IInvitationSendInvitaion
> = (instance, data) => instance.post("/invitation/send_invitation", data);

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiuserauthforget_password}
 */
interface IUserAuthForgetPassword extends StringifiableRecord {
  email: string;
}

export const requestUserAuthForgetPassword: IModel<
  null,
  IUserAuthForgetPassword
> = (instance, query) =>
  instance.get(qs.stringifyUrl({ url: "/user/auth/forget_password", query }));

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiuserpersonal_info_update}
 */
interface IUserPersonalInfoUpdate {
  info: any;
  privacy: number;
}

export const requestUserPersonalInfoUpdate: IModel<
  null,
  IUserPersonalInfoUpdate
> = (instance, data) => instance.post("/user/personal_info_update", data);

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiusershow_torrent_status}
 */
interface IUserShowTorrentStatus extends StringifiableRecord {
  username: string;
}

export const requestUserShowTorrentStatus: IModel<
  {
    uploading: IPersonTorrent[];
    downloading: IPersonTorrent[];
    finished: IPersonTorrent[];
    unfinished: IPersonTorrent[];
  },
  IUserShowTorrentStatus
> = (instance, query) =>
  instance.get(qs.stringifyUrl({ url: "/user/show_torrent_status", query }));

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiuserauthreset_password}
 */
interface IUserAuthResetPassword {
  password: string;
}

export const requestUserAuthResetPassword: IModel<
  null,
  IUserAuthResetPassword
> = (instance, data) => instance.post("/user/auth/reset_password", data);

/**
 * {@link https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#apiuserauthreset_passkey}
 */
export const requestUserAuthResetPasskey: IModel<null, undefined> = (
  instance
) => instance.get("/user/auth/reset_passkey");
