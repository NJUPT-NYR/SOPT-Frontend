import React from "react";
import NextDocument from "next/document";
import { withCookiesContext } from "@/utils/hooks/useCookies";

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => withCookiesContext(App, ctx.req?.cookies ?? null),
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await NextDocument.getInitialProps(ctx);

    return initialProps;
  }
}
