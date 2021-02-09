import ejs from "ejs";
import LruCache from "lru-cache";
import type { HelmetData } from "react-helmet";
import * as path from "path";
import * as fs from "fs";

ejs.cache = new LruCache(100);

export function renderHTML({
  content,
  initPageProps,
  helmet,
}: {
  content: string;
  initPageProps: any;
  helmet: HelmetData;
}) {
  return ejs.compile(
    fs
      .readFileSync(path.join(__dirname, STATIC_FILE_PATH, "../", "index.html"))
      .toString(),
    {
      beautify: false,
      cache: true,
      rmWhitespace: true,
    }
  )({
    content,
    initPageProps,
    helmet,
  });
}
