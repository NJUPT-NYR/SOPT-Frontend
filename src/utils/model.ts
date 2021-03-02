import type { AxiosInstance } from "axios";

export const requestTorrentList = (instance: AxiosInstance) =>
  instance.get("/torrent/list_torrents");

interface IRequestUserLogin {
  username: string;
  password: string;
}

export const requestUserLogin = (
  instance: AxiosInstance,
  { username, password }: IRequestUserLogin
) => instance.post("/user/login", { username, password });
