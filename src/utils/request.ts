import axios from "axios";
import { parserProps } from "@/utils";

export const fetchPageProps = (path: string) =>
  axios
    .get(path + "?onlyProps=true")
    .then((response) => parserProps(response.data));
