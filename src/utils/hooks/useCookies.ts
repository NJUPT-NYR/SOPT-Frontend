import React, { useContext, useMemo } from "react";
import Cookies from "universal-cookie";

export const CookieContext = React.createContext(null);

export function useCookies() {
  const initCookies = useContext(CookieContext);
  const cookies = useMemo(() => {
    return new Cookies(initCookies);
  }, [initCookies]);
  return cookies;
}
