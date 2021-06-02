import { eq } from 'lodash-es';

/**
 * 检查给定数组中某元素出现的次数，采用 `SameValueZero` 算法来比较（与 `===` 的区别为 `NaN` 与 `NaN` 相等）。
 *
 * @category 数组相关方法
 *
 * @param arr   被遍历的数组
 * @param value 目标元素
 *
 * @example
 *
 * ```typescript
 * countOccurrences([1, 1, 2, 3], 1)                // 2
 * countOccurrences(['1', 1, 2, 3], '1')            // 1
 * countOccurrences([NaN, true, NaN, [3]], NaN)     // 2
 * countOccurrences([], 3)                          // 0
 * ```
 */
export const countOccurrences = <T>(arr: T[], value: T) => arr.filter(v => eq(v, value)).length;

/**
 * 返回数组中指定下标间隔的元素，首先选取第一个元素，然后跳过间隔数 -1 的元素选取下一个，以此类推。
 *
 * @category 数组相关方法
 *
 * @param arr 被遍历的数组
 * @param nth 指定的下标间隔
 *
 * @example
 *
 * ```typescript
 * everyNth([1, 2, 3, 4], 2)    // [1, 3]
 * ```
 */
export const everyNth = <T>(arr: T[], nth: number) => arr.filter((v, i) => i % nth === nth - 1);
