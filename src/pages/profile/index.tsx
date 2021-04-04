import { GetServerSideProps } from "next";
import { COOKIE_NAME_JWT_TOKEN } from "@/utils/constants";
import { makeServerFetcher, serverDoFetch } from "@/utils/request";
import * as model from "@/utils/model";

export default function Porfile() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[COOKIE_NAME_JWT_TOKEN];
  if (token?.length) {
    const fetcher = makeServerFetcher({ token });
    const { data, error } = await serverDoFetch(fetcher, [
      model.requestUserShowUser,
    ]);
    if (!error && data?.username) {
      return {
        redirect: {
          destination: `/profile/${data.username}`,
          permanent: false,
        },
      };
    }
  }
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
