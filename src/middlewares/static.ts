import type { Context } from "koa";
import mount from "koa-mount";
import koaStatic from "koa-static";
import * as path from "path";

export default mount(
  "/static",
  koaStatic(path.join(__dirname, STATIC_FILE_PATH))
);
