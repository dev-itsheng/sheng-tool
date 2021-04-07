/**
 * 去掉 HTML 标签
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
 * numberToChinese(13)          // '十三'
 * numberToChinese(13, true)    // '拾叄'
 * ```
 */
export const numberToChinese = (num: number, big = false): string => {

    const unit = big ? '拾佰仟万亿' :  '十百千万亿',
          number = big ? '零壹贰叁肆伍陆柒捌玖' : '零一二三四五六七八九';

    if (num >= 1e8) {
        return numberToChinese(Math.floor(num / 1e9), big) + unit[4] + numberToChinese(num % 1e9);
    }

    if (num >= 1e4) {
        return numberToChinese(Math.floor(num / 1e4), big) + unit[3] + numberToChinese(num % 1e4);
    }

    let str = '';
    let addZero = false;

    if (num >= 1e3) {
        str += number[Math.floor(num / 1e3)] + unit[2];
        num = num % 1e3;
    } else {
        addZero = true;
    }

    if (num >= 1e2) {
        str += addZero ? '零': '' + number[Math.floor(num / 1e2)] + unit[1];
        addZero = false;
    } else {
        addZero = true;
    }

    if (num >= 10) {
        str += addZero ? '零': '' + number[Math.floor(num / 10)] + unit[0]
        addZero = false;
    } else {
        addZero = true;
    }

    if (num > 0) {
        str += addZero ? '零': '' + number[num];
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
 * 数字千分位分割
 *
 * @param num 被处理的数字
 *
 * @example
 *
 * ```typescript
 * divideNumberByThousandth(123456789)  // '1,2345,6789'
 * ```
 */
export const divideNumberByThousandth = (num: number) => {
    return num.toString().indexOf('.') !== -1
        ? num.toLocaleString()
        : num.toString().replace(/(\d)(?=\d{3}$)/g, '$1,');
};
