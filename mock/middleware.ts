import KoaRouter from "koa-router";
import mount from "koa-mount";
import mockjs from "mockjs";

const router = new KoaRouter();

const records = Array.from({ length: 20 }).map(() =>
  mockjs.mock({
    "name|+1": mockjs.Random.pick([
      "car",
      "text",
      "book",
      "horse",
      "rab",
      "ks",
    ]),
    "link|+1": mockjs.Random.url(),
    "size|+1": mockjs.Random.pick(["1kb", "2kb"]),
    "date|+1": mockjs.Random.datetime(),
    "uploadCount|+1": mockjs.Random.pick([1, 2, 3]),
    "downloadCount|+1": mockjs.Random.pick([1, 2, 3]),
    "completeCount|+1": mockjs.Random.pick([1, 2, 3]),
  })
);

router.get("/records", (ctx) => {
  let result = records;
  if (ctx.query.keyword) {
    result = result.filter((one) => one.name.includes(ctx.query.keyword));
  }
  ctx.body = result;
});

export default mount("/mock", router.routes());
