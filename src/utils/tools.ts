/**
 * 用户控制MarkdownEditor的编辑历史
 */
export class SizedHistoryState<T = any> {
  private arr: T[];
  private size: number;
  private ptr: number;
  private listener: any[];
  constructor(size: number, init?: T) {
    this.arr = [];
    this.size = size;
    this.ptr = 0;
    this.listener = [];
    if (init) {
      this.arr.push(init);
    }
  }
  get value(): T | null {
    return this.arr[this.ptr] || null;
  }
  get hasPrev(): boolean {
    return !!this.arr[this.ptr + 1];
  }
  get hasNext(): boolean {
    return !!this.arr[this.ptr - 1];
  }
  movePrev() {
    if (this.hasPrev) {
      this.ptr += 1;
    }
    this.listener.forEach((cb) => cb());
  }
  moveNext() {
    if (this.hasNext) {
      this.ptr -= 1;
    }
    this.listener.forEach((cb) => cb());
  }
  append(value: T) {
    if (this.ptr !== 0) {
      this.arr.splice(0, this.ptr);
      this.ptr = 0;
    }
    this.arr.unshift(value);
    if (this.arr.length > this.size) {
      this.arr.pop();
    }
  }
  clear() {
    this.ptr = 0;
    this.arr = [];
    this.listener.forEach((cb) => cb());
  }
  subscribe(callback) {
    this.listener.push(callback);
  }
  unSubscribe(callback) {
    this.listener = this.listener.filter((one) => one !== callback);
  }
}

export function charsFindIndex({
  chars,
  start,
  end,
  step,
  condition,
}: {
  chars: string[];
  start: number;
  end: number;
  step: number;
  condition: (pos: number, chars: string[]) => boolean;
}): number | null {
  for (let i = start; i !== end; i += step) {
    if (condition(i, chars)) {
      return i;
    }
  }
  return end;
}

export function stringReplace({
  str,
  selectionStart,
  selectionEnd,
  startReplacement,
  endReplacement,
}: {
  str: string;
  selectionStart: number | undefined;
  selectionEnd: number | undefined;
  startReplacement: string;
  endReplacement: string;
}): string {
  if (typeof selectionStart === "number" && typeof selectionEnd === "number") {
    [selectionStart, selectionEnd] = [selectionStart, selectionEnd].sort(
      (a, b) => a - b
    );
    const chars = str.split("");
    if (selectionStart === selectionEnd) {
      selectionStart = charsFindIndex({
        chars,
        start: selectionStart,
        end: 0,
        step: -1,
        condition: (pos, chars) =>
          chars[pos - 1] === " " || chars[pos - 1] === "\n",
      });
      selectionEnd = charsFindIndex({
        chars,
        start: selectionEnd,
        end: chars.length,
        step: 1,
        condition: (pos, chars) => chars[pos] === " " || chars[pos] === "\n",
      });
    }
    chars.splice(selectionStart ?? 0, 0, startReplacement);
    chars.splice((selectionEnd ?? 0) + 1, 0, endReplacement);
    return chars.join("");
  }
}

export function stringAppendNextLine({
  str,
  selectionStart,
  replacement,
}: {
  str: string;
  selectionStart: number;
  replacement: string;
}): string {
  const chars = str.split("");
  selectionStart = charsFindIndex({
    chars,
    start: selectionStart,
    end: chars.length,
    step: 1,
    condition: (pos, chars) => chars[pos] === "\n",
  });
  chars.splice((selectionStart ?? 0) + 1, 0, replacement);
  return chars.join("");
}
