export { default as BasicServerPage } from "./serverPage";
export { default as Observer } from "./observer";

/**
 * decode encode page props
 * @param {string} encodeString
 */
export function parserProps(encodeStr) {
  try {
    return JSON.parse(atob(encodeStr));
  } catch (_e) {
    return null;
  }
}
