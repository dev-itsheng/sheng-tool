/**
 * http://www.alloyteam.com/2013/12/js-calculate-the-number-of-bytes-occupied-by-a-string/
 *
 * 计算字符串所占的内存字节数，默认使用 UTF-8 的编码方式计算，也可指定为 UTF-16
 *
 * UTF-8 是一种可变长度的 Unicode 编码格式，使用 1 - 4 个字节为每个字符编码
 *
 * 000000 - 00007F（128 个代码）        0zzzzzzz（00-7F）                                       1 个字节
 * 000080 - 0007FF（1920 个代码）       110yyyyy（C0-DF）   10zzzzzz（80-BF）                   2 个字节
 * 000800 - 00D7FF
 * 00E000 - 00FFFF（61440 个代码）      1110xxxx（E0-EF）   10yyyyyy    10zzzzzz                3 个字节
 * 010000 - 10FFFF（1048576 个代码）    11110www（F0-F7）   10xxxxxx    10yyyyyy    10zzzzzz    4 个字节
 *
 * 注：Unicode 在范围 D800 - DFFF 中不存在任何字符
 * {@link <a onclick="javascript:pageTracker._tracePageview('/outgoing/zh.wikipedia.org/wiki/UTF-8');"
 *           href="http://zh.wikipedia.org/wiki/UTF-8">http://zh.wikipedia.org/wiki/UTF-8</a>}
 *
 * UTF-16 大部分使用 2 个字节编码，编码超出 65535 的使用 4 个字节
 * 000000 - 00FFFF  2 个字节
 * 010000 - 10FFFF  4 个字节
 *
 * {@link <a onclick="javascript:pageTracker._tracePageview('/outgoing/zh.wikipedia.org/wiki/UTF-16');"
 *           href="http://zh.wikipedia.org/wiki/UTF-16">http://zh.wikipedia.org/wiki/UTF-16</a>}
 *
 * @param   {string} str
 * @param   {string} charset utf-8, utf-16
 * @return  {number}
 */
export const byteLen = (str: string, charset: 'utf-8' | 'utf-16' = 'utf-8') => {

    let total: number = 0;

    if (charset === 'utf-8') {
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);

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
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);

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
 * @description 用于对字符串进行截断处理。当超过限定长度，默认添加 3 个点号。
 * @param target        目标字符串
 * @param length        限定长度
 * @param truncation    省略符
 */
export const truncate = (target: string, length = 30, truncation = '...') => target.length > length ? target.slice(0, length - truncation.length) + truncation : target;

/**
 * @description 转换为驼峰风格
 * @param target
 */
export const camelize = (target: string) => {
    if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
        return target;  // 提前判断，提高 getStyle 等的效率
    }

    return target.replace(/[-_][^-_]/g, match => match.charAt(1).toUpperCase());
};

/**
 * @description 转换为下划线风格
 * @param target
 */
export const underscored = (target: string) => target.replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase();

/**
 * @description 转换为连字符风格（CSS）
 * @param target
 */
export const dasherize = (target: string) => underscored(target).replace(/_/g, '-');

/**
 * @description 首字母大写
 * @param target
 */
export const capitzlize = (target: string) => target.charAt(0).toUpperCase() + target.substring(1).toLowerCase();
