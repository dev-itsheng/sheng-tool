import { eq } from 'lodash-es';

/**
 * @public
 * @description 检查数组中某元素出现的次数，采用 SameValueZero 算法来比较（与 === 的区别为 NaN 与 NaN 相等）
 */
export const countOccurrences = <T>(arr: T[], value: T) => arr.filter(v => eq(v, value)).length;

/**
 * @public
 * @description 返回数组中指定下标间隔的元素
 */
export const everyNth = <T>(arr: T[], nth: number) => arr.filter((v, i) => i % nth === nth - 1);
