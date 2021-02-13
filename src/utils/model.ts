import { instance } from "./request";
import qs from "query-string";

interface IRequestRcords {
  keyword?: string;
}

export const requestRecords = (data?: IRequestRcords) =>
  instance.get(qs.stringifyUrl({ url: "/records", query: { ...data } }));
