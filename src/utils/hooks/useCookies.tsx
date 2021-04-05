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

export function withCookiesContext(WrappedComponent, cookies) {
  return class CookiesContextComponent extends React.Component {
    render() {
      return (
        <CookieContext.Provider value={cookies}>
          <WrappedComponent {...this.props} />
        </CookieContext.Provider>
      );
    }
  };
}
