// import KoaRouter from "koa-router";
// import mount from "koa-mount";
// import mockjs, { mock } from "mockjs";

// const router = new KoaRouter();

// const response = {
//   success(data) {
//     return {
//       success: true,
//       data,
//       errMsg: "",
//     };
//   },
//   error(errMsg) {
//     return {
//       success: false,
//       data: null,
//       errMsg,
//     };
//   },
// };

// const records = Array.from({ length: 1000 }).map(() =>
//   mockjs.mock({
//     "name|+1": mockjs.Random.pick([
//       "Kimetsu Gakuen - Valentine-hen",
//       "瞬きもせずに+／H△G.",
//       "Mafumafu (まふまふ) x Soraru (そらる) One Two Three single",
//       "[RiPiT] SK8 the Infinity - 06 VOSTFR [WEB 1080p]",
//       "[Baechu] Girls' High Mystery Class 여고추리반 S01E05 (1080p)[Baechu] Girls' High Mystery Class 여고추리반 S01E05 (1080p)",
//       "	Nekopara [SUB][1080P] [ENGLISH]",
//       "ks",
//     ]),
//     "link|+1": mockjs.Random.url(),
//     "size|+1": mockjs.Random.pick(["1kb", "2kb"]),
//     "date|+1": mockjs.Random.datetime(),
//     "uploadCount|+1": mockjs.Random.pick([1, 2, 3]),
//     "downloadCount|+1": mockjs.Random.pick([1, 2, 3]),
//     "completeCount|+1": mockjs.Random.pick([1, 2, 3]),
//   })
// );

// router.get("/records", (ctx) => {
//   let result = records;
//   let pagination = ctx.query.pagination ?? 1;
//   pagination = Math.max(1, Math.min(pagination, 50));
//   if (ctx.query.keyword) {
//     result = result.filter((one) => one.name.includes(ctx.query.keyword));
//   }
//   if (pagination) {
//     result = result.slice(20 * (pagination - 1), 20 * pagination);
//   }
//   ctx.body = {
//     list: result,
//     maxPagination: 50,
//     pagination,
//   };
// });

// router.post("/user/add_user", (ctx) => {
//   const { email, username, password, invite_code } = ctx.request.body;
//   if (invite_code !== "code") {
//     ctx.body = response.error("not allowed to register");
//   } else {
//     response.success({
//       id: mockjs.Random.integer(1, 100),
//       email,
//       username,
//       password,
//       passkey: mockjs.Random.string(),
//     });
//   }
// });

// router.post("/user/login", (ctx) => {
//   const { username, password } = ctx.request.body;
//   if (username === "cattchen" && password === "pass") {
//     ctx.body = response.success(null);
//   } else {
//     ctx.body = response.error("username and password not match");
//   }
// });

// router.post("/user/logout", (ctx) => {});

// export default mount("/mock", router.routes());

export {};
