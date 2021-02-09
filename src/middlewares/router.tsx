import "reflect-metadata";
import React from "react";
import Router from "koa-router";
import { renderToString } from "react-dom/server";
import App from "@/containers/App/App";
import * as path from "path";
import { renderHTML } from "@/utils/render";
import { Helmet } from "react-helmet";

/**
 * pages
 */
import { containers } from "@/containers/index";

const router = new Router();

containers.forEach((ServerPage: any) => {
  const targetPath = Reflect.getMetadata("pagePath", ServerPage);
  const routePath = path.join("/", targetPath);
  router.get(routePath, async (ctx) => {
    const result = await ServerPage.getInitPageProps(ctx);
    const initPageProps = Buffer.from(JSON.stringify(result)).toString(
      "base64"
    );
    if (ctx.query.onlyProps) {
      ctx.body = initPageProps;
    } else {
      const content = renderToString(
        <App initPath={routePath} initPageProps={result} />
      );
      const helmet = Helmet.renderStatic();
      ctx.body = renderHTML({ content, initPageProps, helmet });
    }
  });
});

export default router.routes();
