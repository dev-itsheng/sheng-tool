/**
 * @description 验证邮箱格式。
 * @example
 * isEmail('453491931@qq.com')  // => true
 */
export const isEmail = (str: string) => /^[\w-]+@[\w-]+(?:\.[\w-]{2,3}){1,2}$/.test(str);

/**
 * @description 验证手机号，根据工信部 2019 年最新公布的手机号段
 */
export const isMobile = (str: string) => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(str);

/**
 * @description 验证电话号码，规则为可选的区号（3 或 4 位）加横杠，后跟 7 或 8 位数字
 */
export const isPhone = (str: string) =>/^(?:\d{3}-)?\d{8}$|^(?:\d{4}-)?\d{7}$/.test(str);

/**
 * @description 验证 URL 地址
 */
export const isURL = (str: string) => /^(?:https?:\/\/)?[\w-]+(\.[\w-]+)+(?:[\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/.test(str);

/**
 * @description 验证迅雷地址
 */
export const isThunderURI = (str: string) => /^thunderx?:\/\/[a-zA-Z\d]+=$/.test(str);

/**
 * @description 验证 ed2k 地址
 */
export const isEd2kURI = (str: string) => /^ed2k:\/\/\|file\|.+\|\/$/.test(str);

/**
 * @description 验证磁力链接
 */
export const isMagnetURI = (str: string) => /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/.test(str);

/**
 * @description 验证 A 股代码
 */
export const isAShareCode = (str: string) => /^(?:s[hz]|S[HZ])\d{6}$/.test(str);

/**
 * @description 验证 md5
 */
export const isMD5 = (str: string) => /^(?:[a-f\d]{32})|(?:[A-F\d]{32})$/.test(str);

/**
 * @description 验证语义化版本号
 */
export const isVersionCode = (str: string) => /^\d+(?:\.\d+){2}(?:-(?:alpha|beta|rc)\.\d+)?$/.test(str);

/**
 * @description 验证视频地址
 */
export const isVideoURL = (str: string) => /^https?:\/\/(?:.+\/)+.+\.(?:swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i.test(str);

/**
 * @description 验证图片地址
 */
export const isImageURL = (str: string) => /^https?:\/\/(?:.+\/)+.+\.(?:gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/i.test(str);

/**
 * @description 验证 Linux 文件地址
 */
export const isLinuxFileAddress = (str: string) => /^\/(?:[^\/\s]+\/)*[^\/\s]+$/.test(str);

/**
 * @description 验证 Linux 隐藏文件地址
 */
export const isLinuxHiddenFileAddress = (str: string) => /^\/(?:[^\/\s]+\/)*\.[^\/\s]+/.test(str);

/**
 * @description 验证 Windows 文件地址
 */
export const isWindowsFileAddress = (str: string) => /^[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]*$/.test(str);

/**
 * @description 验证 Linux 文件夹地址
 */
export const isLinuxFolderAddress = (str: string) => /^\/(?:[^\/\s]+\/)*$/.test(str);

/**
 * @description 验证 Windows 文件夹地址
 */
export const isWindowsFolderAddress = (str: string) => /^[a-zA-Z]:\\(?:[^\\\s]+\\)*$/.test(str);

export const isLinuxPath = (str: string) => isLinuxFileAddress(str) || isLinuxFolderAddress(str);

export const isWindowsPath = (str: string) => isWindowsFileAddress(str) || isWindowsFolderAddress(str);

export const isPath = (str: string) => isLinuxPath(str) || isWindowsPath(str);

/**
 * @description 验证 12 小时制时间格式（hh:mm:ss）
 */
export const is12Time = (str: string) => /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/.test(str);

/**
 * @description 验证 24 小时制时间格式（HH:mm:ss）
 */
export const is24Time = (str: string) => /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(str);

/**
 * @description 验证 base64 字符串
 */
export const isBase64 = (str: string) => /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(str);

export const isChineseName = (str: string) => /^(?:[\u4e00-\u9fa5·]{2,16})$/.test(str);
export const isEnglishName = (str: string) => /(^[a-zA-Z]+[a-zA-Z\s]{0,20}[a-zA-Z]+$)/.test(str);


/**
 * @description 验证银行卡号
 */
export const isBankCardCode = (str: string) => /^[1-9]\d{9,29}$/.test(str);

/**
 * @description 验证新能源车车牌号
 */
export const isNewEnergyCarNumber = (str: string) => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z][A-HJ-NP-Z](?:(?:[0-9]{5}[DF])|(?:[DF][A-HJ-NP-Z0-9][0-9]{4}))$/.test(str);

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
export const isPassportNumber = (str: string) => /(?:^[EeKkGgDdSsPpHh]\d{8}$)|(^(?:(?:[Ee][a-fA-F])|(?:[DdSsPp][Ee])|(?:[Kk][Jj])|(?:[Mm][Aa])|(?:1[45]))\d{7}$)/.test(str);

/**
 * @description 验证 IP 地址
 */
export const isIPv4 = (str: string) => /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/.test(str);

export const isIPv6 = (str: string) => /^(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){5}:(?:[0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){4}:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){3}:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){2}:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}:(?:(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)\.){3}(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d))|(?:::(?:[0-9A-Fa-f]{1,4}:){0,5}(?:(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)\.){3}(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d))|(?:[0-9A-Fa-f]{1,4}::(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(?:::(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){1,7}:))$/.test(str);

/**
 * @description 验证英文
 */
export const isEnglish = (str: string) => /^[a-zA-Z]+$/.test(str);

/**
 * @description 验证中文
 */
export const isChinese = (str: string) => /^[\u4E00-\u9FA5]+$/.test(str);

/**
 * @description 验证大写字母
 */
export const isEnglishLower = (str: string) => /^[a-z]+$/.test(str);

/**
 * @description 验证小写字母
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

export const isMacAddress = (str: string) => /^(?:(?:(?:(?:[0-9a-f]{2}:){5})|(?:(?:[0-9a-f]{2}-){5}))[0-9a-f]{2})|(?:(?:(?:(?:[0-9A-F]{2}:){5})|(?:(?:[0-9A-F]{2}-){5}))[0-9A-F]{2})$/i.test(str);

/**
 * @description 验证身份证
 */
export const isIdentity = (str: string) => {
    if (!/(?:^\d{15}$)|(?:^\d{17}[\dxX])/.test(str)) {
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
    if (!/(?:1[1-5])|(?:2[1-3])|(?:3[1-7])|(?:4[1-6])|(?:5[0-4])|(?:6[1-5])|71|81|82|91/.test(str.slice(0, 2))) {
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

