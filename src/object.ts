import { camelCase, snakeCase, isPlainObject, isArray, isEqual, isFunction, eq, has } from 'lodash-es';
import { pascalCase } from './string';

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
 * 将对象中的所有键小驼峰化，支持循环引用检查，用于前后端交互（以及后端与数据库交互）时的数据格式转换，支持对象数组。
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
 * 将对象中的所有键大驼峰（Pascal Case）化，支持循环引用检查，用于前后端交互（以及后端与数据库交互）时的数据格式转换，支持对象数组。
 *
 * @param objOrArr 被转换的对象或对象数组
 *
 * @example
 *
 * ```typescript
 * pascalCaseObject({ 'a-b': { c_d: 1 } })       // { AB: { CD: 1 } }
 * pascalCaseObject([{ a_b: 1 }, { c_d: 2 }])    // [{ AB: 1 }, { CD: 2 }]
 * ```
 */
export const pascalCaseObject = recursionObjectKey(pascalCase);


/**
 * 将对象中的所有键下划线化，支持循环引用检查，用于前后端交互（以及后端与数据库交互）时的数据格式转换，支持对象数组。
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

/**
 *
 * 将对象 / 数组中的某个值（或满足某个条件的值，使用 SameValueZero 算法）替换成另一个值（或将原值处理后的值），支持任意嵌套层级和复杂类型深比较。
 *
 * 该方法不会修改原对象 / 数组。
 *
 * ```typescript
 * replaceValueFromObject({ x: 1 }, 1, 2)                               // { x: 2 }
 * replaceValueFromObject({ x: 1 }, { x: 1 }, 2)                        // 2
 * replaceValueFromObject({ x: { y: 1 } }, { y: 1 }, 2)                 // { x: 2 }
 * replaceValueFromObject({ x: { y: 1 } }, 1, 2)                        // { x: { y: 2 } }
 * replaceValueFromObject([1, 2, 3, 1], 1, '3')                         // ['3', 2, 3, '3']
 * replaceValueFromObject([NaN, NaN, 2, 3], NaN, '3')                   // ['3', '3', 2, 3]
 * replaceValueFromObject([1, 2, 3, 1], v => v % 2 === 0, '3')          // [1, '3', 3, 1]
 * replaceValueFromObject([1, 2, 3, 1], v => v % 2 === 0, y => y + 10)  // [1, 12, 3, 1]
 * ```
 *
 * @param obj   被转换的数组 / 对象
 * @param from  某个值，或满足值的条件函数，此时接收 `obj` 中的部分值
 * @param to    另一个值，或处理值的函数，此时接收 `obj` 中的部分值
 * @param autoExecuteFunction 当 `from` 和 `to` 是函数时，是否作为转换条件执行，默认为 `true`，对于替换函数的特殊场景时需要置为 `false`
 */
export const replaceValueFromObject = (obj: any, from: any, to: any, autoExecuteFunction = true): any => {
    from = autoExecuteFunction && isFunction(from) ? from(obj) : from;
    to = autoExecuteFunction && isFunction(to) ? to(obj) : to;

    if (isEqual(obj, from)) {
        return to;
    }

    return isArray(obj)
        ? obj.map(item => replaceValueFromObject(item, from, to))
        : Object.fromEntries(Object.entries(obj).map(([key, value]) => [
            key,
            isPlainObject(value) ? replaceValueFromObject(value, from, to) : eq(value, from) ? to : value
        ]));
};

/**
 * 检查对象中的所有空值（默认为 `null`, `undefined`, `''`）如果有对应的默认值则替换成默认值，支持任意嵌套层级和深比较。
 *
 * 此方法不会修改原对象。
 *
 * @param data
 * @param formatterObj
 * @param emptyValue
 *
 * @example
 * ```typescript
 * replaceEmptyValueFromObject({ x: '', y: 1 }, { x: 2, y: 3 })                     // { x: 2, y: 1 }
 * replaceEmptyValueFromObject({ x: '', y: null, z: undefined }, { x: 2, y: 3 })    // { x: 2, y: 3, z: undefined }
 * ```
 *
 */
const formatEmptyToDefault = <T extends object>(data: T, formatterObj: Record<keyof T, any>, emptyValue = [null, undefined, '']): object => (
    Object.fromEntries(Object.entries(data).map(([key, value]) => [
        key,
        isPlainObject(value)
            ? formatEmptyToDefault(value, formatterObj)
            : emptyValue.some(item => isEqual(item, value)) && has(formatterObj, key)
                ? formatterObj[key as keyof T]
                : value
    ]))
);

/**
 * 将对象中的所有空值（默认为 `null`, `undefined`, `''`）移除，支持任意嵌套层级和深比较。
 *
 * 不支持循环比较（如 `{ a: { b: '' }, c: 1 }` 在将 `{}` 和 `''` 设为空值时只会移除 `b`，此时 `a` 为 `{}` 但不会再次检查）。
 *
 * 此方法不会修改原对象。
 *
 * @param data          被处理的对象
 * @param emptyValue    被认为是「空值」的列表，默认为 `[null, undefined, '']`
 *
 * @example
 *
 * ```typescript
 * removeEmptyValue({ a: 1, b: '', c: null, d: undefined, e: { f: '' } })   // { a: 1, e: {} }
 * removeEmptyValue({ a: { b: {} }, c: 1, d: {} }, [{}])                    // { a: { }, c: 1 }
 * ```
 */
export const removeEmptyValue = (data: object, emptyValue = [null, undefined, '']): object => (
    Object.fromEntries(Object.entries(data)
        .filter(([, value]) => !emptyValue.some(item => isEqual(item, value)))
        .map(([key, value]) => [key, isPlainObject(value) ? removeEmptyValue(value, emptyValue) : value])
    )
);
