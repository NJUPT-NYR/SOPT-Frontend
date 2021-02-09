import mount from "koa-mount";

import routerMiddleware from "./router";
import staticMiddleware from "./static";

export default [routerMiddleware, staticMiddleware];
