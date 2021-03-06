import { eq } from 'lodash-es';

/**
 * @description 检查给定数组中某元素出现的次数，采用 `SameValueZero` 算法来比较（与 `===` 的区别为 `NaN` 与 `NaN` 相等）
 * @param arr  需要遍历的数组
 * @param value 目标元素
 *
 * @example
 *
 * ```typescript
 * countOccurrences([1, 1, 2, 3], 1)                // 2
 * countOccurrences(['1', 1, 2, 3], '1')            // 1
 * countOccurrences([NaN, true, NaN, [3]], NaN)     // 2
 * ```
 */
export const countOccurrences = <T>(arr: T[], value: T) => arr.filter(v => eq(v, value)).length;

/**
 * 返回数组中指定下标间隔的元素
 *
 * @example
 * ```typescript
 * everyNth([1, 2, 3, 4], 2)    // [1, 3]
 * ```
 */
export const everyNth = <T>(arr: T[], nth: number) => arr.filter((v, i) => i % nth === nth - 1);
