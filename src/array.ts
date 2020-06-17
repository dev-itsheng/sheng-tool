import {randomRange} from './';

/**
 * @description 去重
 * @param arr
 * @example
 * unique([1, 1, 2, 3])    // [1, 2, 3]
 */
export const unique = <T>(arr: T[]) => Array.from(new Set(arr));

/**
 * @description 并集
 * @param arr1
 * @param arr2
 * @param restArrs
 */
export const union = <T>(arr1: T[], arr2: T[], ...restArrs: T[][]) => unique<T>([...arr1, ...arr2, ...restArrs.flat()]);

/**
 * @description 交集
 * @param arr1
 * @param arr2
 * @param restArrs
 */
export const intersect = <T>(arr1: T[], arr2: T[], ...restArrs: T[][]) => arr1.filter(item => arr2.includes(item) && restArrs.every(arg => arg.includes(item)));

/**
 * @description 补集
 * @param target
 * @param array
 */
export const diff = <T>(target: T[], array: T[]) => target.filter(n => !array.includes(n));

/**
 * @description 打乱一个数组
 * @param arr
 */
export const shuffle = <T>(arr: T[]) => {
    const result: T[] = [],
        arrCopy = arr.slice();

    while (arrCopy.length) {
        const random = randomRange(0, arrCopy.length - 1);
        result.push(arrCopy[random]);
        arrCopy.splice(random, 1);
    }

    return result;
};

/**
 * @description 检查数组中某元素出现的次数
 * @param arr
 * @param value
 */
export const countOccurrences = <T>(arr: T[], value: T) => arr.filter(v => v === value).length;

/**
 * @description 返回数组中下标间隔 nth 的元素
 * @param arr
 * @param nth
 */
export const everyNth = <T>(arr: T[], nth: number) => arr.filter((v, i) => i % nth === nth - 1);
