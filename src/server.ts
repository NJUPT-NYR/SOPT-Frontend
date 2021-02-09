import Koa from "koa";
import middlewares from "@/middlewares";
import { run } from "@/utils/cluster";

run(() => {
  const app = new Koa();
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
  app.listen(SERVER_PORT, () => {
    console.log(`worker ready, listen request from 0.0.0.0:${SERVER_PORT}`);
  });
});
