import {
  charsFindIndex,
  SizedHistoryState,
  stringAppendAroundSelection,
  stringAppendNextLine,
  stringAppendThisLine,
} from "../tools";

describe("sized history state", () => {
  it("constructor work well", (done) => {
    new SizedHistoryState(10);
    new SizedHistoryState(10, "c1");
    done();
  });
  it("read and append value well", (done) => {
    const state = new SizedHistoryState(10, "c1");
    expect(state.value).toBe("c1");
    state.append("c2");
    expect(state.value).toBe("c2");
    done();
  });
  it("moves well", (done) => {
    const state = new SizedHistoryState(2, "c1");
    expect(state.hasPrev).toBe(false);
    expect(state.hasNext).toBe(false);
    state.append("c2");
    expect(state.hasNext).toBe(false);
    expect(state.hasPrev).toBe(true);
    state.movePrev();
    expect(state.value).toBe("c1");
    expect(state.hasPrev).toBe(false);
    expect(state.hasNext).toBe(true);
    state.moveNext();
    expect(state.value).toBe("c2");
    expect(state.hasPrev).toBe(true);
    expect(state.hasNext).toBe(false);
    done();
  });
  it("control size well", (done) => {
    const state = new SizedHistoryState(3, "c1");
    state.append("c2");
    state.append("c3");
    state.append("c4");
    state.movePrev();
    state.movePrev();
    expect(state.value).toBe("c2");
    expect(state.hasPrev).toBe(false);
    done();
  });
  it("clear well", (done) => {
    const state = new SizedHistoryState(2, "c1");
    state.append("c2");
    state.clear();
    expect(state.value).toBe(null);
    done();
  });
});

describe("chars find index", () => {
  it("find end of segment", (done) => {
    const chars = "hello1 hello2 hello3".split("");
    expect(
      charsFindIndex({
        chars,
        start: 9,
        end: chars.length,
        step: 1,
        condition: (pos, chars) => chars[pos] === " " || chars[pos] === "\n",
      })
    ).toBe(13);
    expect(
      charsFindIndex({
        chars,
        start: 9,
        end: chars.length,
        step: -1,
        condition: (pos, chars) => chars[pos] === " " || chars[pos] === "\n",
      })
    ).toBe(6);
    done();
  });
  it("find end of line", (done) => {
    const chars = "hello1 \nhello2\n hello3".split("");
    expect(
      charsFindIndex({
        chars,
        start: 10,
        end: chars.length,
        step: 1,
        condition: (pos, chars) => chars[pos] === " " || chars[pos] === "\n",
      })
    ).toBe(14);
    expect(
      charsFindIndex({
        chars,
        start: 9,
        end: chars.length,
        step: -1,
        condition: (pos, chars) => chars[pos] === " " || chars[pos] === "\n",
      })
    ).toBe(7);
    done();
  });
});

describe("string append around selection", () => {
  const str = "hello1 hello2 hello3";
  it("replace selection", (done) => {
    expect(
      stringAppendAroundSelection({
        str,
        selectionStart: 8,
        selectionEnd: 10,
        startReplacement: "**",
        endReplacement: "**",
      })
    ).toBe("hello1 h**el**lo2 hello3");
    done();
  });
  it("replace word", (done) => {
    expect(
      stringAppendAroundSelection({
        str,
        selectionStart: 8,
        selectionEnd: 8,
        startReplacement: "**",
        endReplacement: "**",
      })
    ).toBe("hello1 **hello2** hello3");
    done();
  });
});

describe("string append next line", () => {
  const str = "hello1 hello2 \nhello3";
  it("append next line", (done) => {
    expect(
      stringAppendNextLine({
        str,
        selectionStart: 1,
        replacement: "> ",
      })
    ).toBe("hello1 hello2 \n> hello3");
    done();
  });
});

describe("string append this line", () => {
  const str = "hello1\n hello2 \nhello3";
  it("append this line", (done) => {
    expect(
      stringAppendThisLine({
        str,
        selectionStart: 9,
        replacement: "> ",
      })
    ).toBe("hello1\n>  hello2 \nhello3");
    done();
  });
});
