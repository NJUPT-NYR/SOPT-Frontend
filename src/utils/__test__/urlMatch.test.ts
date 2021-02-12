import { urlMatch } from "../urlMatch";

describe("urlMathc", () => {
  it("should match path", (done) => {
    expect(urlMatch("/", "/").isMatched).toBe(true);
    expect(urlMatch("/", "/notRoot").isMatched).toBe(false);

    expect(urlMatch("/page1", "/page1").isMatched).toBe(true);
    expect(urlMatch("/page1", "/").isMatched).toBe(false);
    expect(urlMatch("/page1", "/page2").isMatched).toBe(false);
    done();
  });
  it("should parse params", (done) => {
    expect(urlMatch("/profile/:username", "/profile/cattchen")).toEqual({
      isMatched: true,
      params: { username: "cattchen" },
      query: {},
    });
    expect(urlMatch("/post/:type/:id", "/post/type1/114514")).toEqual({
      isMatched: true,
      params: { type: "type1", id: "114514" },
      query: {},
    });
    done();
  });
  it("should parse query", (done) => {
    expect(urlMatch("/search", "/search")).toEqual({
      isMatched: true,
      params: {},
      query: {},
    });
    expect(urlMatch("/search", "/search?keyword=ks")).toEqual({
      isMatched: true,
      params: {},
      query: { keyword: "ks" },
    });
    expect(urlMatch("/search", "/search?keyword=ks&page=1")).toEqual({
      isMatched: true,
      params: {},
      query: { keyword: "ks", page: "1" },
    });
    done();
  });
});
