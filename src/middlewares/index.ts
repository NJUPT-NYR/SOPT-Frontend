import routerMiddleware from "./router";
import staticMiddleware from "./static";
import koaBody from "koa-body";

const middlewares = [staticMiddleware, routerMiddleware];

if (ENABLE_MOCK) {
  const mockMiddleware = require("../../mock/middleware").default;
  middlewares.unshift(koaBody(), mockMiddleware);
}

export default middlewares;
