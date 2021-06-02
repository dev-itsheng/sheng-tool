import { camelCase, isPlainObject } from 'lodash-es';

/**
 * 将对象中的所有键驼峰化
 *
 * @example
 *
 * ```typescript
 * camelCaseObject({ 'a-b': { c_d: 1 } })   // { aB: { cD: 1 } }
 * ```
 */
export const camelCaseObject : (obj: object) => object = (obj: object) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [camelCase(key), isPlainObject(value) ? camelCaseObject(value) : value]));
