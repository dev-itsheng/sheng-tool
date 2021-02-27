/**
 * 可选参数执行
 */
export const partial = (fn: Function, ...args: any[]) => {
    return args.length < 1
        ? fn
        : (...innerArgs: any[]) => fn(...args.map(arg => arg !== undefined ? arg : innerArgs.shift()).concat(innerArgs));
}

/**
 * 柯里化
 */
export const curry = (fn: Function) => {
    return (function inner<T>(innerFunctionArgsLength: number, currentArgs: T[]) {

        // 检查第一个参数
        return innerFunctionArgsLength === 0

            // 函数参数都传完了，可以直接调用
            ? fn(...currentArgs)

            // 参数还有剩余，递归返回传入剩余参数的新函数
            : (...newArgs: T[]) => inner(innerFunctionArgsLength - newArgs.length, currentArgs.concat(newArgs));
    })(fn.length, []);
};

export const argumentNames = (fn: Function) => {
    const names = fn.toString().match(/^[\s(]*function[^(]*\(([^)]*)\)/)?.[1].replace(/\s+/g, '').split(',');
    return names?.length == 1 && !names[0] ? [] : names;
};
