import { SizedHistoryState } from "../tools";

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
