import { camelCase, snakeCase, isPlainObject, isArray } from 'lodash-es';

const recursionObjectKey: (fn: Function) => <T extends object | object[]>(objOrArr: T) => T = (fn: Function) => (objOrArr: object | object[]) => {
    const set = new Set();

    set.add(objOrArr);

    return isArray(objOrArr)
        ? objOrArr.map(recursionObjectKey(fn))
        : Object.fromEntries(Object.entries(objOrArr).map(([key, value]) => [
            fn(key),
            isPlainObject((value)) && !set.has(value) ? recursionObjectKey(fn)(value) : value
        ]));
};

/**
 * 将对象中的所有键驼峰化，支持循环引用检查，用于前后端交互（以及后端与数据库交互）时的数据格式转换，支持对象数组
 *
 * @param objOrArr 被转换的对象或对象数组
 *
 * @example
 *
 * ```typescript
 * camelCaseObject({ 'a-b': { c_d: 1 } })       // { aB: { cD: 1 } }
 * camelCaseObject([{ a_b: 1 }, { c_d: 2 }])    // [{ aB: 1 }, { cD: 2 }]
 * ```
 */
export const camelCaseObject = recursionObjectKey(camelCase);

/**
 * 将对象中的所有键下划线化，支持循环引用检查，用于前后端交互（以及后端与数据库交互）时的数据格式转换，支持对象数组
 *
 * @param objOrArr 被转换的对象或对象数组
 *
 * @example
 *
 * ```typescript
 * snakeCaseObject({ aB: { cD: 1 } })           // { a_b: { c_d: 1 } }
 * snakeCaseObject([{ aB: 1 }, { cD: 2 }])      // [{ a_b: 1 }, { c_d: 2 }]
 * ```
 */
export const snakeCaseObject = recursionObjectKey(snakeCase);
