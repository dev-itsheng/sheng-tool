/**
 * 邮箱格式正则表达式
 */
export const regEmail = /^[\w-]+@[\w-]+(?:\.[\w-]{2,3}){1,2}$/;

/**
 * 验证邮箱格式
 *
 * @example
 *
 * ```typescript
 * isEmail('example@hotmail.com')   // true
 * ```
 */
export const isEmail = (str: string) => regEmail.test(str);

/**
 * 手机号正则表达式，根据工信部 2019 年最新公布的手机号段
 */
export const regMobile = /^(?:(?:\+|00)86)?1(?:3[\d]|4[5-7|9]|5[0-3|5-9]|6[5-7]|7[0-8]|8[\d]|9[189])\d{8}$/;

/**
 * 验证手机号，根据工信部 2019 年最新公布的手机号段
 *
 * @example
 *
 * ```typescript
 * isMobile('13000000000')  // true
 * ```
 */
export const isMobile = (str: string) => regMobile.test(str);

/**
 * 电话号码正则表达式，规则为可选的区号（3 或 4 位）加横杠，后跟 7 或 8 位数字
 */
export const regPhone = /^(?:\d{3}-)?\d{8}$|^(?:\d{4}-)?\d{7}$/;

/**
 * 验证电话号码，规则为可选的区号（3 或 4 位）加横杠，后跟 7 或 8 位数字
 *
 * @example
 *
 * ```typescript
 * isPhone('010-12345678')  // true
 * ```
 */
export const isPhone = (str: string) => regPhone.test(str);

/**
 * URL 地址正则表达式
 */
export const regURL = /^(?:https?:\/\/)?[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/;


/**
 * 验证 URL 地址
 *
 * @example
 *
 * ```typescript
 * isURL('https://www.qq.com')   // true
 * ```
 */
export const isURL = (str: string) => regURL.test(str);

/**
 * 迅雷地址正则表达式
 */
export const regThunder = /^thunderx?:\/\/[a-zA-Z\d]+=$/;

/**
 * 验证迅雷地址
 *
 * @example
 *
 * ```typescript
 * isThunderURI('thunder://qufodhrwoi8vymouzhjpdmvyy2hpbmeuy29tl3nvd')  // true
 * ```
 */
export const isThunderURI = (str: string) => regThunder.test(str);

/**
 * ed2k 地址正则表达式
 */
export const regEd2kURI = /^ed2k:\/\/\|file\|.+\|\/$/;

/**
 * 验证 ed2k 地址
 *
 * @example
 *
 * ```typescript
 * isEd2kURI('ed2k://|file|C6%A5%A3%A9%60.avi|/')     // true
 * ```
 */
export const isEd2kURI = (str: string) => regEd2kURI.test(str);

/**
 * 磁力链接正则表达式
 */
export const regMagnetURI = /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/;

/**
 * 验证磁力链接
 *
 * @example
 *
 * ```typescript
 * isMagnetURI('magnet:?xt=urn:btih:C510E15DB53588BDB089EF28F813FB21DFF4E93D')      // true
 * ```
 */
export const isMagnetURI = (str: string) => regMagnetURI.test(str);

/**
 * A 股代码正则表达式，规则为 sh / sz / SH / SZ 后面跟六位数字
 */
export const regAShareCode = /^(?:s[hz]|S[HZ])\d{6}$/;

/**
 * 验证 A 股代码，规则为 sh / sz / SH / SZ 后面跟六位数字
 *
 * @example
 *
 * ```typescript
 * isAShareCode('sh001896')     // true
 * isAShareCode('sz001896')     // true
 * isAShareCode('SH001896')     // true
 * isAShareCode('SZ001896')     // true
 * ```
 */
export const isAShareCode = (str: string) => regAShareCode.test(str);

/**
 * md5 正则表达式，规则为 32 位十六进制数字（字母需要全大写或全小写）
 */
export const regMD5 = /^[a-f\d]{32}|[A-F\d]{32}$/;

/**
 * 验证 md5，规则为 32 位十六进制数字（字母需要全大写或全小写）
 *
 * @example
 *
 * ```typescript
 * isMD5('0e37e09b702d2815e32be7c7b65a62da')    // true
 * ```
 */
export const isMD5 = (str: string) => regMD5.test(str);

/**
 * 语义化版本号正则表达式，规则为三个以点号为分隔的数字，后面跟可选的横杠与 alpha / beta / rc 三个单词，再跟可选的点号和数字
 */
export const regVersionCode = /^\d+(?:\.\d+){2}(?:-(?:alpha|beta|rc)(\.\d+)?)?$/

/**
 * 验证语义化版本号，规则为三个以点号为分隔的数字，后面跟可选的横杠与 alpha / beta / rc 三个单词，再跟可选的点号和数字
 *
 * @example
 *
 * ```typescript
 * isVersionCode('0.0.1')           // true
 * isVersionCode('0.1.0-alpha')     // true
 * isVersionCode('0.2.1-beta.5')    // true
 * isVersionCode('1.0.0-rc')        // true
 * ```
 */
export const isVersionCode = (str: string) => regVersionCode.test(str);

/**
 * 视频地址正则表达式
 */
export const regVideoURL = /^https?:\/\/(?:.+\/)+.+\.(?:swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i;

/**
 * 验证视频地址
 */
export const isVideoURL = (str: string) => regVideoURL.test(str);

/**
 * 图片地址正则表达式
 */
export const regImageURL = /^https?:\/\/(?:.+\/)+.+\.(?:gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/i;

/**
 * 验证图片地址
 */
export const isImageURL = (str: string) => regImageURL.test(str);

/**
 * Linux 文件地址正则表达式
 */
export const regLinuxFileAddress = /^\/(?:[^\/\s]+\/)*[^\/\s]+$/;

/**
 * 验证 Linux 文件地址
 */
export const isLinuxFileAddress = (str: string) => regLinuxFileAddress.test(str);

/**
 * Linux 隐藏文件地址正则表达式
 */
export const regLinuxHiddenFileAddress = /^\/(?:[^\/\s]+\/)*\.[^\/\s]+/;

/**
 * 验证 Linux 隐藏文件地址
 */
export const isLinuxHiddenFileAddress = (str: string) => regLinuxHiddenFileAddress.test(str);

/**
 * Windows 文件地址正则表达式
 */
export const regWindowsFileAddress = /^[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]+$/;

/**
 * 验证 Windows 文件地址
 */
export const isWindowsFileAddress = (str: string) => regWindowsFileAddress.test(str);

/**
 * Linux 文件夹地址正则表达式
 */
export const regLinuxFolderAddress = /^\/(?:[^\/\s]+\/)*$/;

/**
 * 验证 Linux 文件夹地址
 */
export const isLinuxFolderAddress = (str: string) => regLinuxFolderAddress.test(str);

/**
 * Windows 文件夹地址正则表达式
 */
export const regWindowsFolderAddress = /^[a-zA-Z]:\\(?:[^\\\s]+\\)*$/;

/**
 * 验证 Windows 文件夹地址
 */
export const isWindowsFolderAddress = (str: string) => /^[a-zA-Z]:\\(?:[^\\\s]+\\)*$/.test(str);

/**
 * Linux 路径正则表达式，包含文件地址和文件夹地址
 */
export const regLinuxPath = /^\/(?:[^\/\s]+\/)*[^\/\s]*$/;

/**
 * 验证 Linux 路径，包含文件地址和文件夹地址
 */
export const isLinuxPath = (str: string) => regLinuxPath.test(str);

/**
 * Windows 路径正则表达式，包含文件地址和文件夹地址
 */
export const regWindowsPath = /^[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]*$/;

/**
 * 验证 Windows 路径，包含文件地址和文件夹地址
 */
export const isWindowsPath = (str: string) => regWindowsPath.test(str);

/**
 * 路径正则表达式，包含 Linux 和 Windows 的文件地址和文件夹地址
 */
export const regPath = /^\/(?:[^\/\s]+\/)*[^\/\s]*|[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]*$/;

/**
 * 验证路径，包含 Linux 和 Windows 的文件地址和文件夹地址
 */
export const isPath = (str: string) => regPath.test(str);

/**
 * 12 小时制时间格式（hh:mm:ss）正则表达式
 */
export const reg12Time = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/;

/**
 * 验证 12 小时制时间格式（hh:mm:ss）
 *
 * @example
 *
 * ```typescript
 * is12Time('10:05:35')     // true
 * ```
 */
export const is12Time = (str: string) => reg12Time.test(str);

/**
 * 24 小时制时间格式（HH:mm:ss）正则表达式
 */
export const reg24Time = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

/**
 * 验证 24 小时制时间格式（HH:mm:ss）
 */
export const is24Time = (str: string) => reg24Time.test(str);

/**
 * base64 字符串
 */

/**
 * 验证 base64 字符串
 */
export const isBase64 = (str: string) => /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(str);

export const isChineseName = (str: string) => /^[\u4e00-\u9fa5·]{2,16}$/.test(str);
export const isEnglishName = (str: string) => /^[a-zA-Z]+[a-zA-Z\s]{0,20}[a-zA-Z]+$/.test(str);


/**
 * @description 验证银行卡号
 */
export const isBankCardCode = (str: string) => /^[1-9]\d{9,29}$/.test(str);

/**
 * @description 验证新能源车车牌号
 */
export const isNewEnergyCarNumber = (str: string) => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z][A-HJ-NP-Z](?:[0-9]{5}[DF]|[DF][A-HJ-NP-Z0-9][0-9]{4})$/.test(str);

/**
 * @description 验证非新能源车车牌号
 */
export const isNonNewEnergyCarNumber = (str: string) => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z][A-HJ-NP-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/.test(str);

/**
 * @description 验证车牌号
 */
export const isCarNumber = (str: string) => isNewEnergyCarNumber(str) || isNonNewEnergyCarNumber(str);

/**
 * @description 验证护照号码
 */
export const isPassportNumber = (str: string) => /^[EeKkGgDdSsPpHh]\d{8}$|(^(?:[Ee][a-fA-F]|[DdSsPp][Ee]|[Kk][Jj]|[Mm][Aa]|1[45])\d{7}$)/.test(str);

/**
 * @description 验证 IP 地址
 */
export const isIPv4 = (str: string) => /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/.test(str);

export const isIPv6 = (str: string) => /^(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){5}:(?:[0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){4}:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){3}:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){2}:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)|(?:[0-9A-Fa-f]{1,4}:){0,5}:(?:(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)\.){3}(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)|::(?:[0-9A-Fa-f]{1,4}:){0,5}(?:(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)\.){3}(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)|[0-9A-Fa-f]{1,4}::(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4}|::(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:)$/.test(str);

/**
 * @description 验证英文
 */
export const isEnglish = (str: string) => /^[a-zA-Z]+$/.test(str);

/**
 * @description 验证中文
 */
export const isChinese = (str: string) => /^[\u4E00-\u9FA5]+$/.test(str);

/**
 * @description 验证小写字母
 */
export const isEnglishLower = (str: string) => /^[a-z]+$/.test(str);

/**
 * @description 验证大写字母
 */
export const isEnglishUpper = (str: string) => /^[A-Z]+$/.test(str);

/**
 * @description 验证数字字符串
 */
export const isNumberString = (str: string) => /^\d+(?:.\d+)?$/.test(str);

/**
 * @description 验证整数字符串
 */
export const isIntegerString = (str: string) => /^\d+$/.test(str);

/**
 * @description 验证日期字符串，允许中间用横杠或点连接
 */
export const isDateString = (str: string) => /^\d{4}([-.])\d{2}\1\d{2}$/.test(str);

/**
 * @description 验证邮政编码
 */
export const isPostal = (str: string) => /^(?:0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(str);

/**
 * @description 验证 QQ 号
 */
export const isQQ = (str: string) => /^[1-9]\d{4,9}$/.test(str);

/**
 * @description 验证金额，允许整数或两位小数
 */
export const isMoney = (str: string) => /^\d+(?:\.\d{1,2})?$/.test(str);

export const isUsername = (str: string) => /^[a-zA-Z0-9_-]{4,16}$/.test(str);

/**
 * @description 微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线
 */
export const isWeixinCode = (str: string) => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(str);

/**
 * @description 强密码，最少 6 位，包括至少 1 个大写字母，1 个小写字母，1 个数字，1 个特殊字符
 */
export const isStrongPassword = (str: string) => /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(str);

export const isJavaPackageName = (str: string) => /^(?:[a-zA-Z_][a-zA-Z0-9_]*)+(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+$/.test(str);

export const isMacAddress = (str: string) => /^(?:(?:[0-9a-f]{2}:){5}|(?:[0-9a-f]{2}-){5})[0-9a-f]{2}|(?:(?:[0-9A-F]{2}:){5}|(?:[0-9A-F]{2}-){5})[0-9A-F]{2}$/i.test(str);

/**
 * @description 验证身份证
 */
export const isIdentity = (str: string) => {
    if (!/^\d{15}$|^\d{17}[\dxX]/.test(str)) {
        return false;
    }

    // 前两位
    // 11 -> 北京     12 -> 天津    13 -> 河北    14 -> 山西    15 -> 内蒙古
    // 21 -> 辽宁     22 -> 吉林    23 -> 黑龙江
    // 31 -> 上海     32 -> 江苏    33 -> 浙江    34 -> 安徽    35 -> 福建    36 -> 江西    37 -> 山东
    // 41 -> 河南     42 -> 湖北    43 -> 湖南    44 -> 广东    45 -> 广西    46 -> 海南
    // 50 -> 重庆     51 -> 四川    52 -> 贵州    53 -> 云南    54 -> 西藏
    // 61 -> 陕西     62 -> 甘肃    63 -> 青海    64 -> 宁夏    65 -> 新疆
    // 71 -> 台湾
    // 81 -> 香港     82 -> 澳门
    // 91 -> 国外
    if (!/1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|71|81|82|91/.test(str.slice(0, 2))) {
        return false;
    }

    // 出生日期
    let year: number,
        month: number,
        day: number;

    if (str.length === 15) {
        year = parseInt(str.slice(6, 2));
        month = parseInt(str.slice(8, 2));
        day = parseInt(str.slice(10, 2));
    } else {
        year = parseInt(str.slice(6, 4));
        month = parseInt(str.slice(10, 2));
        day = parseInt(str.slice(12, 2));
    }

    const date = new Date(year, month, day);

    if (
        !(
            (date.getFullYear() === year || date.getFullYear() === year + 1900)
                && date.getMonth() === month
                && date.getDay() === day
        )
    ) {
        return false;
    }

    // 校验码
    // 规则是：将前 17 位的每个数都乘以对应的权重值（即 weight 数组）将结果对 11 取余数，与最后一位相比较
    //         余数可能是 0 - 10，分别对应 1 0 X 9 8 7 6 5 4 3 2 的情况
    if (str.length === 18) {
        const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
              code = '10X98765432';

        let sum = 0;

        for (let i = 0; i < 17; i++) {
            sum += parseInt(str[i]) * weight[i];
        }

        return code[sum % 11] === str[17];
    }

    return true;
}

/**
 * @description 验证火车车次
 * @param str
 */
export const isTrainNumber = (str: string) => /^[GCDZTSPKXLY1-9]\d{1,4}$/.test(str);

/**
 * @description 验证手机机身码
 * @param str
 */
export const isIMEI = (str: string) => /^\d{15,17}$/.test(str);

