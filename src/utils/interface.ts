import type { DeepPartial } from "utility-types";
/**
 * @see https://github.com/NJUPT-NYR/SOPT/blob/master/API.md
 */

// !DEPRECATED
export interface IRecord {
  name: string;
  link: string;
  size: string;
  date: string;
  uploadCount: number;
  downloadCount: number;
  completeCount: number;
}
