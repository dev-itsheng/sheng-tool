/**
 * 将传入的红、绿、蓝三种颜色分量转换成标准的 #RRGGBB 字符串，可选是否使用短字符串（#RGB）
 *
 * @param r 红色
 * @param g 绿色
 * @param b 蓝色
 * @param short 默认为 false，是否使用短字符串
 *
 * @example
 *
 * ```typescript
 * rgb2hex(0, 0, 0)         // '#000000'
 * rgb2hex(0, 0, 0, true)   // '#000'
 * rgb2hex(25, 58, 105)     // '#193a69'
 * ```
 */
export const rgb2hex = (r: number, g: number, b: number, short = false) => {
    const color2String = (color: number) => color.toString(16).padStart(2, '0');
    const stringCanShort = (str: string) => str[0] === str[1];

    let rStr = color2String(r),
        gStr = color2String(g),
        bStr = color2String(b);

    if (short && [rStr, gStr, bStr].every(str => stringCanShort(str))) {
        rStr = rStr[0];
        gStr = gStr[0];
        bStr = bStr[0];
    }

    return `#${rStr}${gStr}${bStr}`;
};

/**
 * 将 #RRGGBB 或 #RGB 字符串转换成红、绿、蓝三种颜色分量的数组
 *
 * @param hex 颜色字符串
 *
 * @example
 *
 * ```typescript
 * hex2rgb('#193a69')       // [25, 58, 105]
 * hex2rgb('#eee')          // [238, 238, 238]
 * ```
 */
export const hex2rgb = (hex: string) => {
    hex = hex.slice(1);

    let r, g, b;

    if (hex.length === 3) {
        [r, g, b] = hex.split('').map(str => str.repeat(2));
    } else {
        [r, g, b] = hex.match(/../g)!;
    }

    return [r, g, b].map(color => parseInt(color, 16));
}
