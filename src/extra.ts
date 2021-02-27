/**
 * 去掉 HTML 标签
 */
export const removeHTMLTag = (str: string) => str.replace(/<[^>]+>/g, '');

export const numberToChinese = (num: number) => {

}

/**
 * 检测密码强度
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

    if (/[.-_]/.test(password)) {
        level++;
    }

    return level;
};

/**
 * 数字千分位分割
 */
export const divideNumberByThousandth = (num: number) => {
    return num.toString().indexOf('.') !== -1
        ? num.toLocaleString()
        : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}
