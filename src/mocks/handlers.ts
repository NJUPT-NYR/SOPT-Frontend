import mockjs from "mockjs";

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

export const handlers = [
  {
    path: "/torrent/list_torrents",
    method: "GET",
    resolver(req, res) {
      const torrents = mockjs.mock({
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
      });
      res.json(response.success(torrents));
    },
  },
];
