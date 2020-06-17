/**
 * @description 求和
 * @param arr {number[]}
 */
export const sum = (arr: number[]) => arr.reduce((pre, cur) => pre + cur, 0);

/**
 * @description 平均值
 * @param arr
 */
export const average = (arr: number[]) => sum(arr) / arr.length;

/**
 * @description 最大值
 * @param arr
 */
export const max = (arr: number[]) => Math.max(...arr);

/**
 * @description 最小值
 * @param arr
 */
export const min = (arr: number[]) => Math.min(...arr);

/**
 * @description 极差
 * @param arr
 */
export const range = (arr: number[]) => max(arr) - min(arr);

/**
 * @description 方差
 * @param arr
 */
export const variance = (arr: number[]) => arr.reduce((pre, cur) => pre + (cur - average(arr)) ** 2, 0) / arr.length;

/**
 * @description 标准差
 * @param arr
 */
export const standardDeviation = (arr: number[]) => Math.sqrt(variance(arr));
