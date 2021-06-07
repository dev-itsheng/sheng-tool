/**
 * 确保数值在最值闭区间之内，如果超出限界，则置换为离它最近的最大值或最小值
 *
 * @param target 要检查的值
 * @param min 最小值范围
 * @param max 最大值范围
 *
 * @example
 *
 * ```typescript
 * limit(5, 3, 9)   // 5
 * limit(3, 5, 9)   // 5
 * limit(13, 5, 9)  // 9
 * ```
 */
export const limit = (target: number, min: number, max: number) => Math.max(Math.min(target, max), min);

/**
 * 求出距离指定数值最近的那个数
 *
 * @param target 要检查的值
 * @param min 最小值范围
 * @param max 最大值范围
 *
 * @example
 *
 * ```typescript
 * nearer(5, 3, 9)      // 3
 * nearer(3, 5, 9)      // 5
 * nearer(13, 5, 9)     // 9
 * ```
 */
export const nearer = (target: number, min: number, max: number) => target - min < max - target ? min : max;
