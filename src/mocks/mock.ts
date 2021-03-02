import { urlMatch } from "../utils/urlMatch";
import { handlers, response } from "./handlers";

export function makeMockMiddleware(req, res) {
  const url = req.url.replace(/^\/api/, "");
  for (const handler of handlers) {
    const matched =
      handler.method.toUpperCase() === req.method &&
      urlMatch(handler.path, url);
    if (matched.isMatched) {
      req.query = matched.query;
      req.params = matched.params;
      return handler.resolver(req, res);
    }
  }
  res.json(response.error("path not found"));
}
