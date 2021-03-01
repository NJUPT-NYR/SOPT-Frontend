import { rest } from "msw";

const response = {
  success(data) {
    return {
      success: true,
      data,
      errMsg: "",
    };
  },
  error(errMsg) {
    return {
      success: false,
      data: null,
      errMsg,
    };
  },
};

export const handlers = [
  rest.post("/user/add_user", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/user/login", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/user/auth/check_identity", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/user/auth/reset_password", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.get("/user/auth/reset_passkey", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.get("/user/auth/transfer_money", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("user/upload_avatar", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/user/personal_info_update", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/invitation/send_invitation", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/invitation/list_invitations", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/torrent/add_torrent", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/torrent/update_torrent", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/torrent/list_torrents", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/torrent/list_posted_torrent", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
  rest.post("/torrent/show_torrent", (req, res, ctx) => {
    return res(ctx.json(response.success(null)));
  }),
];
