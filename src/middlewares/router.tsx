import "reflect-metadata";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "@/containers/App/App";
import { renderHTML } from "@/utils/render";
import { Helmet } from "react-helmet";

/**
 * pages
 */
import { containers } from "@/containers/index";
import type { ParameterizedContext } from "koa";
import { urlMatch } from "@/utils";

const middleware = async (ctx: ParameterizedContext, next) => {
  const matchedPage = containers.find((one) => {
    const targetPath = Reflect.getMetadata("pagePath", one);
    if (!targetPath) return false;
    const matched = urlMatch(targetPath, ctx.url);
    if (matched.isMatched) {
      ctx.query = matched.query;
      ctx.params = matched.params;
    }
    return matched.isMatched;
  });
  if (matchedPage) {
    const result = await matchedPage.getInitPageProps(ctx);
    const initPageProps = Buffer.from(JSON.stringify(result)).toString(
      "base64"
    );
    if (ctx.query.onlyProps) {
      ctx.body = initPageProps;
    } else {
      const content = renderToString(
        <App initPath={ctx.path} initPageProps={result} />
      );
      const helmet = Helmet.renderStatic();
      ctx.body = renderHTML({ content, initPageProps, helmet });
    }
  } else {
    ctx.redirect("/404");
  }
  return next();
};

export default middleware;
