import { makeMockMiddleware } from "../../mocks/mock";

export default function handler(req, res) {
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK === "true") {
    makeMockMiddleware(req, res);
  } else {
    res.redirect("/404");
  }
}
