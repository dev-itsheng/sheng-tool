import { eq, isEqual, omit } from 'lodash-es';

/**
 * 检查给定数组中某元素出现的次数，采用 `SameValueZero` 算法来比较（与 `===` 的区别为 `NaN` 与 `NaN` 相等）。
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
 * @param arr 被遍历的数组
 * @param nth 指定的下标间隔
 *
 * @example
 *
 * ```typescript
 * everyNth([1, 2, 3, 4], 2)    // [1, 3]
 * ```
 */
export const everyNth = <T>(arr: T[], nth: number) => arr.filter((v, i) => i % nth === 0);

/**
 * 判断数组是否包含有相同元素，可通过参数来区分浅比较（此时使用 SameValueZero 算法）和深比较。
 *
 * @param arr 要检查的数组
 * @param deep 是否深比较，默认为 `true`
 *
 * @example
 *
 * ```typescript
 * isUniqItem([1, 1, 2, 3])                     // false
 * isUniqItem([1, 2, 3])                        // true
 * isUniqItem([NaN, NaN])                       // false
 * isUniqItem([{ a: 1 }, { a: 1 }])             // false
 * isUniqItem([{ a: 1 }, { a: 1 }], false)      // true
 * ```
 */
export const isUniqItem = (arr: any[], deep = true) => !(arr.some((item, index) => (arr.slice(index + 1).some(item2 => deep ? isEqual(item, item2) : eq(item, item2)))));

/**
 * 在一个对象数组中，根据指定的 `key` 和 `value`，查找对应的元素（使用深比较，返回第一个），并返回其 `anotherKey` 对应的值，如果没找到，则返回 `undefined`。
 *
 * @param arr 对象数组
 * @param key 要查找的指定的 key
 * @param value 要查找的指定的 value
 * @param anotherKey 需要返回的值对应的 key
 *
 * @example
 *
 * ```typescript
 * getValueByAnotherValue([{ a: 1, b: 2 }, { a: 2, b: 3 }], 'a', 2, 'b')   // 3
 * getValueByAnotherValue([{ a: 1, b: 2 }, { a: 2, b: 3 }], 'a', 3, 'b')   // undefined
 * ```
 */
export const getValueByAnotherValue = <T>(arr: T[], key: keyof T, value: any, anotherKey: keyof T) => arr.find(item => isEqual(item[key], value))?.[anotherKey];

/**
 * 在一个对象数组中，根据指定的 `value` 找对应的 `label`（如果有多个，返回第一个），如果没找到，返回 `undefined`。
 *
 * 通常配合组件库的选择器使用。
 *
 * @param arr 对象数组
 * @param value 指定的 value
 *
 * @example
 *
 * ```typescript
 * getLabelByValue([{ value: 1, label: '1' }, { value: 2, label: '2' }], 1)   // '1'
 * getLabelByValue([{ value: 1, label: '1' }, { value: 2, label: '2' }], 3)   // undefined
 * ```
 */
export const getLabelByValue = <T extends { label: any, value: any }>(arr: T[], value: any) => getValueByAnotherValue(arr, 'value', value, 'label');

/**
 * 在一个对象数组中，根据指定的 `label` 找对应的 `value`（如果有多个，返回第一个），如果没找到，返回 `undefined`。
 *
 * 通常配合组件库的选择器使用。
 *
 * @param arr 对象数组
 * @param label 指定的 label
 *
 * @example
 *
 * ```typescript
 * getValueByLabel([{ value: 1, label: '1' }, { value: 2, label: '2' }], '1')   // 1
 * getValueByLabel([{ value: 1, label: '1' }, { value: 2, label: '2' }], '3')   // undefined
 * ```
 */
export const getValueByLabel = <T extends { label: any, value: any }>(arr: T[], label: any) => getValueByAnotherValue(arr, 'label', label, 'value');

/**
 * 判断一个数组是否为另一个数组的子集，可通过参数来区分浅比较（SameValueZero）和深比较。
 *
 * @param source 需要判断的数组
 * @param target 被判断的数组
 * @param deep 是否深比较，默认为 `true`
 *
 * @example
 *
 * ```typescript
 * isSubset([1, 2, 3], [1, 2, 3, 4])            // true
 * isSubset([1, 2, 3], [1, 2, 4])               // false
 * isSubset([1, 1, 2, 3], [1, 2, 3])            // false
 * isSubset([1, 1, 2, 3], [1, 1, 2, 3, 4])      // true
 * isSubset([{ x: 1 }], [{ x: 1 }, { x: 2 }])   // true
 * isSubset([{ x: 1 }], [{ x: 1 }], false)      // false
 * ```
 */
export const isSubset = <T>(source: T[], target: T[], deep = true) => {
    const targetIsUsed = Array.from({ length: target.length }).fill(false);

    for (const sourceItem of source) {
        const targetIsUsedIndex = target.findIndex(
            (targetItem, targetIndex) => !targetIsUsed[targetIndex] && (deep ? isEqual(sourceItem, targetItem) : eq(sourceItem, targetItem))
        );

        if (targetIsUsedIndex === -1) {
            return false;
        }

        targetIsUsed[targetIsUsedIndex] = true;
    }

    return true;
};

/**
 * 判断一个数组和另一个数组是否有交集，可通过参数来区分浅比较（SameValueZero）和深比较。
 *
 * @param source 被比较的数组
 * @param target 被比较的另一个数组
 * @param deep   是否深比较，默认为 `true`
 *
 * @example
 *
 * ```typescript
 * isIntersect([1, 2, 3], [3, 4, 5])                                    // true
 * isIntersect([1, 2, 3], [4, 5, 6])                                    // false
 * isIntersect([{ x: 1 },  { x: 3 }], [{ x: 1 }, { x: 2 }])             // true
 * isIntersect([{ x: 1 },  { x: 3 }], [{ x: 1 }, { x: 2 }], false)      // false
 * ```
 */
const isIntersect = <T>(source: T[], target: T[], deep = true) => source.some(item => target.some(targetItem => deep ? isEqual(item, targetItem) : eq(item, targetItem)));

/**
 * 将对象数组每一项中的的某一个 key 拿出来，将其他 key 构成 value 并组成新的对象。
 *
 * @param arr 对象数组
 * @param key 指定的 key
 *
 * @example
 *
 * ```typescript
 * convertArrayToObject([{ x: 'a', y: 1 }, { x: 'b', y: 2 }], 'x')   // { a: { y: 1 }, b: { y: 2 } }
 * ```
 */
const convertArrayToObject = <T extends object>(arr: T[], key: keyof T) => Object.fromEntries(arr.map(item => [item[key], omit(item, [key])]));

/**
 * 与 `convertArrayToObject` 相反。
 *
 * 遍历对象，将它的每一个 key 以另一个 key 作为 key，并合并其他 value 组成对象数组。
 *
 * @param obj 对象
 * @param key 指定的 key
 *
 * @example
 *
 * ```typescript
 * convertObjectToArray({ a: { y: 1 }, b: { y: 2 } }, 'x')   // [{ x: 'a', y: 1 }, { x: 'b', y: 2 }]
 * ```
 */
const convertObjectToArray = (obj: Record<string, object>, key: string) => Object.entries(obj).map(([k, v]) => ({ [key]: k, ...v }));

