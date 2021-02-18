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
import type { Context, ParameterizedContext } from "koa";
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
  if (!matchedPage) {
    ctx.redirect("/404");
  } else {
    const roles: any[] = Reflect.getMetadata("authRoles", matchedPage) ?? [];
    if (roles.length && !verifyAuth(ctx, roles)) {
      if (isOnlyProps(ctx)) {
        ctx.body = new PagePropsData({ authCheckPass: false });
      } else {
        ctx.redirect("/login");
      }
    } else {
      const result = await matchedPage.getInitPageProps(ctx);
      const data = new PagePropsData({ data: result, authCheckPass: true });
      const initPageProps = Buffer.from(JSON.stringify(result)).toString(
        "base64"
      );
      if (isOnlyProps(ctx)) {
        ctx.body = data;
      } else {
        const content = renderToString(
          <App initPath={ctx.path} initPageProps={result} />
        );
        const helmet = Helmet.renderStatic();
        ctx.body = renderHTML({ content, initPageProps, helmet });
      }
    }
  }
  return next();
};
/**
 *
 * @param {Context} ctx
 * @param {any[]} roles
 */
function verifyAuth(ctx, roles) {
  return false;
}

function PagePropsData({
  data,
  authCheckPass,
}: {
  data?: any;
  authCheckPass?: boolean;
}) {
  this.data = data ?? null;
  this.authCheckPass = authCheckPass ?? false;
}

function isOnlyProps(ctx: Context) {
  return !!ctx.query.onlyProps;
}

export default middleware;
