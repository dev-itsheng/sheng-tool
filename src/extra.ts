/**
 * 去掉 HTML 标签
 *
 * @param str 要转换的字符串
 *
 * @example
 *
 * ```typescript
 * removeHTMLTag('<div>123</div>')      // '123'
 * ```
 */
export const removeHTMLTag = (str: string) => str.replace(/<[^>]+>/g, '');

/**
 * 将阿拉伯数字转换成中文数字，可以转换成小写（默认）或大写（银行数字用的那种）
 *
 * @param num 被转换的阿拉伯数字
 * @param big 是否采用大写数字，默认为 `false`
 *
 * @example
 *
 * ```typescript
 * numberToChinese(5)           // '五'
 * numberToChinese(13)          // '十三'
 * numberToChinese(105)         // '一百零五'
 * numberToChinese(1234)        // '一千二百三十四'
 * numberToChinese(1000001001)  // '十亿零一千零一'
 * numberToChinese(80000000)    // '八千万'
 * numberToChinese(13, true)    // '拾叁'
 * ```
 */
export const numberToChinese = (num: number, big = false, prefixZero = false): string => {

    const unit = big ? '拾佰仟万亿' :  '十百千万亿',
          number = big ? '零壹贰叁肆伍陆柒捌玖' : '零一二三四五六七八九';

    if (num >= 1e8) {
        return numberToChinese(Math.floor(num / 1e8), big) + unit[4] + numberToChinese(num % 1e8, big, true);
    }

    if (num >= 1e4) {
        return numberToChinese(Math.floor(num / 1e4), big) + unit[3] + numberToChinese(num % 1e4, big, true);
    }

    let str = '';
    let addZero = false;
    let read = false;


    const zero = () => read && addZero ? '零' : '';

    if (num >= 1e3) {
        str += number[Math.floor(num / 1e3)] + unit[2];
        num = num % 1e3;
        read = true;
    } else {

        if (prefixZero || read) {
            addZero = true;
        }
    }

    if (num >= 1e2) {
        str += zero() + number[Math.floor(num / 1e2)] + unit[1];
        num %= 1e2;
        addZero = false;
        read = true;
    } else {
        if (prefixZero || read) {
            addZero = true;
        }
    }

    if (num >= 10) {
        const ten = Math.floor(num / 10);
        str += zero() + ((ten !== 1 || read) ? number[Math.floor(num / 10)] : '') + unit[0];
        num %= 10;
        addZero = false;
        read = true;
    } else {
        if (prefixZero || read) {
            addZero = true;
        }
    }

    if (num > 0) {
        str += zero() + number[num];
    }

    if (prefixZero && str) {
        str = '零' + str;
    }


    return str;
};

/**
 * 检测密码强度，规则为出现数字、大写字母、小写字母、下划线分别加一分，返回总分
 *
 * @param password 被检测的密码
 *
 * @example
 *
 * ```typescript
 * checkPwdStrong('1')      // 1
 * checkPwdStrong('a')      // 1
 * checkPwdStrong('1a')     // 2
 * checkPwdStrong('1Aa')    // 3
 * checkPwdStrong('1Aa_')   // 4
 * ```
 */
export const checkPwdStrong = (password: string) => {
    let level = 0;

    if (/\d/.test(password)) {
        level++;
    }

    if (/[a-z]/.test(password)) {
        level++;
    }

    if (/[A-Z]/.test(password)) {
        level++;
    }

    if (/[.\-_]/.test(password)) {
        level++;
    }

    return level;
};

/**
 * 将 URL Pattern 表达式转成正则表达式，URL Pattern 的语法参考[这里](https://developer.chrome.com/extensions/match_patterns)。
 *
 * @example
 *
 * ```typescript
 * getRegexpByUrlPattern('*://www.baidu.com/').toString()      // '/^(http|https|file|ftp):\/\/[^/]*?w\.baidu\.com\/\/?/'
 * ```
 * @param pattern URL Pattern 字符串
 */
export const getRegexpByUrlPattern = (pattern: string) => {
    const [, scheme, host, path] = /^(\*|http|https|file|ftp):\/\/(\*|(?:\*\.)?[^*/]+)?\/(.*)$/.exec(pattern)!;

    return new RegExp(
        `^
        ${scheme === '*' ? '(http|https|file|ftp)' : scheme}
        ://
        ${host === '*' ? '[^/]+?' : (/^\*\./.test(host) ? `[^/]*?${host.slice(2)}` : host).replace(/\./g, '\\.')}
        ${path === '*' ? '(/.*)?' : `/${path.replace(/\*/g, '.*?')}/?`}
    `.replace(/\s+/g, ''),
    );
};
