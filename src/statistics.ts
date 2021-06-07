import { max, min, mean } from 'lodash-es';

/**
 * 极差，为了与范围（range）区别，函数名设置为 distance
 *
 * @param arr 被统计的数据
 *
 * @example
 *
 * ```typescript
 * distance([1, 2, 3, 4, 5])    // 4
 * distance([])                 // NaN
 * ```
 */
export const distance = (arr: number[]) => max(arr)! - min(arr)!;

/**
 * 方差
 *
 * @param arr 被统计的数据
 *
 * @example
 *
 * ```typescript
 * variance([1, 2, 3, 4, 5])    // 2
 * variance([])                 // NaN
 * ```
 */
export const variance = (arr: number[]) => arr.reduce((pre, cur) => pre + (cur - mean(arr)) ** 2, 0) / arr.length;

/**
 * 标准差
 *
 * @param arr 被统计的数据
 *
 * @example
 *
 * ```typescript
 * standardDeviation([1, 1, 3, 3])  // 1
 * ```
 */
export const standardDeviation = (arr: number[]) => Math.sqrt(variance(arr));
