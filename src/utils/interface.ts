/**
 * @see https://github.com/NJUPT-NYR/SOPT/blob/master/docs/API.md#response-data
 */

export interface IGeneralResponse<TData> {
  data: TData;
  success: boolean;
  errMsg: string;
}

export interface IDataWithCount<TData> {
  count: number;
  ret: TData;
}

export interface ITorrentID {
  id: number;
  visible: boolean;
}

export interface ISlimTorrent {
  id: number;
  title: string;
  poster: string;
  tag?: string[];
  lastEdit: string;
  length: string;
  free: boolean;
  downloading: number;
  uploading: number;
  finished: number;
}

export interface IFullTorrent {
  id: number;
  title: string;
  poster: string;
  description?: string;
  visible: boolean;
  tag?: string[];
  createTime: string;
  lastEdit: string;
  free: boolean;
  downloading: number;
  uploading: number;
  finished: number;
  length?: number;
  files?: string[];
  infohash?: string;
}

export interface ITag {
  name: string;
  amount: number;
}

export interface IPersonTorrent {
  id: number;
  title: string;
  length: number;
  upload: number;
  download: number;
}

export interface IAccount {
  id: number;
  email: string;
  username: string;
  passkey: string;
  role: number;
}

export interface IUser {
  id: number;
  username: string;
  registerTime: string;
  lastActivity: string;
  invitor?: string;
  upload: number;
  download: number;
  money: number;
  rank: string;
  avatar?: string;
  other?: any;
  privacy: number;
  email: string;
  passkey: string;
}

export interface IInvitation {
  sender?: string;
  code: string;
  address: string;
  usage: boolean;
}

export interface IRank {
  id: number;
  name: string;
  rold?: number;
  upload: number;
  age: number;
  next?: number;
}

export interface IMessage {
  id: number;
  sender: string;
  receiver: string;
  title: string;
  body?: string;
  read: boolean;
  sendTime: string;
}
