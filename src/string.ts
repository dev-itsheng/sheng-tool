import { isBoolean, isDate, isNumber, isString } from 'lodash-es';
import dayjs from 'dayjs/esm';

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

/**
 * 转义 SQL 字符串，在模板字符串前面使用。
 *
 * 具体转换规则为：
 *
 * * 如果是布尔类型的值，`true` 转换成 `'true'`，`false` 转换成 `'false'`。
 * * 如果是数字类型的值，转换成对应的字符串。
 * * 如果是日期类型的值，转换成 `YYYY-MM-DD HH:mm:ss` 对应的字符串。
 * * 如果是字符串，会对引号、换行符、制表符等特殊字符进行转义。
 * * 其他类型则会报错。
 *
 * @example
 *
 * ```typescript
 * escapeSqlTemplate`SELECT * FROM table WHERE name = ${'a'}`   // 'SELECT * FROM table WHERE name = \'a\''
 * escapeSqlTemplate`${JSON.stringify({a: 1})}`                 // '\'{\\\"a\\\":1}\''
 * ```
 */
export const escapeSqlTemplate = (strings: string, ...values: any[]) => {
    const escapeValue = (val: any) => {
        if (isBoolean(val)) {
            return val ? 'true' : 'false';
        }

        if (isNumber(val)) {
            return val.toString();
        }

        if (isDate(val)) {
            return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
        }

        if (isString(val)) {
            const CHARS_ESCAPE_MAP = {
                '\0'   : '\\0',
                '\b'   : '\\b',
                '\t'   : '\\t',
                '\n'   : '\\n',
                '\r'   : '\\r',
                '\x1a' : '\\Z',
                '"'    : '\\"',
                '\''   : '\\\'',
                '\\'   : '\\\\'
            };
            return `'${val.replace(/[\0\b\t\n\r\x1a"'\\]/g, str => CHARS_ESCAPE_MAP[str as keyof typeof CHARS_ESCAPE_MAP])}'`;
        }

        throw new Error('暂不支持此类型');
    }

    let result = '';

    for (let i = 0; i < values.length; i++) {
        result += strings[i] + escapeValue(values[i]);
    }

    result += strings[strings.length - 1];

    return result;
}
