import type { AxiosInstance } from "axios";

export const requestTorrentList = (instance: AxiosInstance) =>
  instance.get("/torrent/list_torrents");
