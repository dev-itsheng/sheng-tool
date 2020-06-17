/**
 * 去掉 HTML 标签
 * @param str
 */
export const removeHTMLTag = (str: string) => str.replace(/<[^>]+>/g, '');



/**
 * @description 取得范围内的一个随机整数
 * @param min
 * @param max
 */
export const randomRange = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1));

export const numberToChinese = (num: number) => {

}

/**
 * @description 检测密码强度
 * @param password
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
 * @param num
 */
export const divideNumberByThousandth = (num: number) => {
    return num.toString().indexOf('.') !== -1
        ? num.toLocaleString()
        : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}
