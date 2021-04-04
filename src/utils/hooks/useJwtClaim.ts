import { useCookies } from "./useCookies";
import { COOKIE_NAME_JWT_TOKEN } from "@/utils/constants";
import { useMemo } from "react";
import decode from "jwt-decode";

export function useJwtClaim() {
  const cookies = useCookies();
  const token: { sub: string; role: number; exp: number } = useMemo(() => {
    return decode(cookies.get(COOKIE_NAME_JWT_TOKEN));
  }, [cookies, cookies.get(COOKIE_NAME_JWT_TOKEN)]);
  return token;
}
