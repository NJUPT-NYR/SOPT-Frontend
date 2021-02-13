import routerMiddleware from "./router";
import staticMiddleware from "./static";

const middlewares = [staticMiddleware, routerMiddleware];

if (ENABLE_MOCK) {
  const mockMiddleware = require("../../mock/middleware").default;
  middlewares.unshift(mockMiddleware);
}

export default middlewares;
