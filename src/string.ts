/**
 * 计算字符串所占的内存字节数，默认使用 UTF-8 的编码方式计算，也可指定为 UTF-16。
 *
 * @example
 *
 * ```typescript
 * byteLen('1')                 // 1
 * byteLen('1', 'utf-16')       // 2
 * byteLen('\u{5f8}')           // 2
 * byteLen('\u{5f8}', 'utf-16') // 2
 * byteLen('以')                // 3
 * byteLen('以', 'utf-16')      // 2
 * byteLen('𪚥')                // 4
 * byteLen('𪚥', 'utf-16')      // 4
 * ```
 *
 * @param   str 要计算的字符串
 * @param   charset 编码格式，支持 utf8 和 utf16，默认为 utf8
 * @return  字节数
 */
export const byteLen = (str: string, charset: 'utf-8' | 'utf-16' = 'utf-8') => {

    let total: number = 0;

    if (charset === 'utf-8') {
        for (const char of Array.from(str)) {
            const charCode = char.codePointAt(0)!;

            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4;
            }
        }
    } else {
        for (const char of Array.from(str)) {
            const charCode = char.codePointAt(0)!;

            if (charCode <= 0xffff) {
                total += 2;
            } else {
                total += 4;
            }
        }
    }

    return total;
}

/**
 * 用于对字符串进行截断处理。当超过限定长度（默认是 30），默认添加 3 个点号。
 *
 * @example
 *
 * ```typescript
 * truncate('hello world', 5)                       // 'he...'
 * truncate('hello world', 300)                     // 'hello world'
 * truncate('hello world', 8, '--__')               // 'hell--__'
 * truncate('hello world hello world hello world')  // 'hello world hello world hel...'
 * ```
 *
 * @param target        目标字符串
 * @param length        限定长度
 * @param truncation    省略符
 */
export const truncate = (target: string, length = 30, truncation = '...') => target.length > length ? target.slice(0, length - truncation.length) + truncation : target;
