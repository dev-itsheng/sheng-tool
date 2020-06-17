/**
 * @description 确保数值在最值闭区间之内，如果超出限界，则置换为离它最近的最大值或最小值
 * @param target
 * @param min
 * @param max
 */
export const limit = (target: number, min: number, max: number) => Math.max(Math.min(target, max), min);

/**
 * @description 求出距离指定数值最近的那个数
 * @param target
 * @param min
 * @param max
 */
export const nearer = (target: number, min: number, max: number) => target - min < max - target ? min : max;
