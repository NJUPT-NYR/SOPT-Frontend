/**
 * 用户控制MarkdownEditor的编辑历史
 */
export class SizedHistoryState<T = any> {
  private values: T[];
  private size: number;
  private ptr: number;
  private listener: any[];
  constructor(size: number, init?: T) {
    this.values = [];
    this.size = size;
    this.ptr = 0;
    this.listener = [];
    if (init) {
      this.values.push(init);
    }
  }
  get value(): T | null {
    return this.values[this.ptr] || null;
  }
  get hasPrev(): boolean {
    return !!this.values[this.ptr + 1];
  }
  get hasNext(): boolean {
    return !!this.values[this.ptr - 1];
  }
  movePrev = () => {
    if (this.hasPrev) {
      this.ptr += 1;
    }
    this.listener.forEach((cb) => cb());
  };
  moveNext = () => {
    if (this.hasNext) {
      this.ptr -= 1;
    }
    this.listener.forEach((cb) => cb());
  };
  append = (value: T) => {
    if (this.ptr !== 0) {
      this.values.splice(0, this.ptr);
      this.ptr = 0;
    }
    this.values.unshift(value);
    if (this.values.length > this.size) {
      this.values.pop();
    }
  };
  clear = () => {
    this.ptr = 0;
    this.values = [];
    this.listener.forEach((cb) => cb());
  };
  subscribe = (callback) => {
    this.listener.push(callback);
  };
  unSubscribe = (callback) => {
    this.listener = this.listener.filter((one) => one !== callback);
  };
}

export function stringAppendAroundSelection({
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
      for (let i = selectionStart; i >= 0; i--) {
        if (chars[i - 1] === " " || chars[i - 1] === "\n" || i === 0) {
          selectionStart = i;
          break;
        }
      }
      for (let i = selectionEnd; i <= chars.length; i++) {
        if (chars[i] === " " || chars[i] === "\n" || i === chars.length) {
          selectionEnd = i;
          break;
        }
      }
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
  for (let i = selectionStart; i < chars.length; i++) {
    if (chars[i] === "\n" || i === chars.length - 1) {
      selectionStart = i;
      break;
    }
  }
  chars.splice((selectionStart ?? 0) + 1, 0, replacement);
  return chars.join("");
}

export function stringAppendThisLine({
  str,
  selectionStart,
  replacement,
}: {
  str: string;
  selectionStart: number;
  replacement: string;
}): string {
  const chars = str.split("");
  for (let i = selectionStart; i >= 0; i--) {
    if (chars[i - 1] === "\n" || i === 0) {
      selectionStart = i;
      break;
    }
  }
  chars.splice(selectionStart ?? 0, 0, replacement);
  return chars.join("");
}

export function objectSkipNullOrUndefinedOrEmptyString(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (
        obj[key] === undefined ||
        obj[key] === null ||
        (typeof obj[key] === "string" && obj[key].length === 0)
      ) {
        delete obj[key];
      }
    }
  }
  return obj;
}

export function dateFormat(date: Date, format: string) {
  if (!date) return undefined;
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "f+": date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (var k in o)
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  return format;
}

export function isBrowser(): boolean {
  return globalThis.window !== undefined;
}

export class Revalidator<T extends object> {
  private activators: WeakMap<T, T[]>;
  private listeners: WeakMap<T, (() => void)[]>;
  constructor(dependencies: [T, T[]][]) {
    this.activators = new WeakMap();
    for (const [key, value] of dependencies) {
      for (const item of value) {
        if (!this.activators.has(item)) {
          this.activators.set(item, []);
        }
        this.activators.get(item).push(key);
      }
    }
    this.listeners = new WeakMap();
  }
  revalidate(model: T) {
    const watchers = this.activators.get(model);
    watchers?.forEach((watcher) => {
      const callbacks = this.listeners.get(watcher);
      callbacks?.forEach((callback) => {
        callback();
      });
    });
  }
  register(model, callback) {
    if (!this.listeners.has(model)) {
      this.listeners.set(model, []);
    }
    this.listeners.get(model).push(callback);
  }
  revoke(model, callback) {
    const callbacks = this.listeners.get(model);
    if (callbacks?.length) {
      const index = callbacks.findIndex((one) => one === callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}
