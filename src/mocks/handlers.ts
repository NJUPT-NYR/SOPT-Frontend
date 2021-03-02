import mockjs from "mockjs";
import type { NextApiRequest, NextApiResponse } from "next";

export const response = {
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

export const handlers: {
  path: string;
  method: "GET" | "POST";
  resolver: (req: NextApiRequest, res: NextApiResponse) => void;
}[] = [
  {
    path: "/torrent/list_torrents",
    method: "GET",
    resolver(req, res) {
      const torrents = Array.from({ length: 20 }).map(() =>
        mockjs.mock({
          id: mockjs.Random.integer(1, 1000),
          "title|+1": mockjs.Random.pick([
            "Kimetsu Gakuen - Valentine-hen",
            "瞬きもせずに+／H△G.",
            "Mafumafu (まふまふ) x Soraru (そらる) One Two Three single",
            "[RiPiT] SK8 the Infinity - 06 VOSTFR [WEB 1080p]",
            "[Baechu] Girls' High Mystery Class 여고추리반 S01E05 (1080p)[Baechu] Girls' High Mystery Class 여고추리반 S01E05 (1080p)",
            "	Nekopara [SUB][1080P] [ENGLISH]",
            "ks",
          ]),
          poster: mockjs.Random.name(),
          downloaded: mockjs.Random.integer(1, 100),
          tag: ["tag1", "tag2", "tag3"],
        })
      );
      res.json(response.success(torrents));
    },
  },
  {
    path: "/user/login",
    method: "POST",
    resolver(req, res) {
      const { username, password } = req.body;
      if (!username || !password) {
        res.json(response.error("Input Invalid."));
      } else if (username !== "cattchen" || password !== "pass") {
        res.json(response.error("Auth Fail."));
      } else {
        res.json(response.success("FAKE_TOKEN"));
      }
    },
  },
];
