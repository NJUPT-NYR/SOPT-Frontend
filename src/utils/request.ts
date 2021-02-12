import axios from "axios";
import { parserProps } from "@/utils";

export const fetchPageProps = (path: string, query: any) => {
  const nextPath = path.includes("?")
    ? path + "&onlyProps=true"
    : path + "?onlyProps=true";
  return axios.get(nextPath).then((response) => parserProps(response.data));
};

export const instance = axios.create({
  baseURL: ".",
});
