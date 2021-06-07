import { sum, initial, last, map } from 'lodash-es';

/**
 * 生成一个数字验证器，以验证特殊（不超过特定值及小数点位数）的数字格式。
 *
 * @param max 最大值
 * @param decimalLength 小数位数，默认为 `0`
 * @param allowMinus 是否允许为负数，默认为 `false`
 *
 * @example
 *
 * ```typescript
 * generateNumberValidator(50, 2)('hello')        // false
 * generateNumberValidator(50)('1.5')             // false
 * generateNumberValidator(50, 2)('49.95')        // true
 * generateNumberValidator(50, 2)('-1')           // false
 * generateNumberValidator(50, 2, true)('-1')     // true
 * generateNumberValidator(50, 1)('80')           // false
 * generateNumberValidator(50, 1)('30.25')        // false
 * ```
 */
export const generateNumberValidator = (max: number, decimalLength: number = 0, allowMinus = false) => {
    return (str: string) => {
        if (!isNumberString(str)) {
            return false;
        }

        if (decimalLength && str.includes('.') && !(new RegExp(`\\.\\d{${decimalLength}}$`)).test(str)) {
            return false;
        }

        const num = parseFloat(str);

        if (!decimalLength && !Number.isInteger(num)) {
            return false;
        }

        if (!allowMinus && num < 0) {
            return false;
        }

        return num <= max;
    }
}

/**
 * 验证邮箱格式
 *
 * @example
 *
 * ```typescript
 * isEmail('example@hotmail.com')   // true
 * ```
 */
export const isEmail = (str: string) => /^[\w-]+@[\w-]+(?:\.[\w-]{2,3}){1,2}$/.test(str);

/**
 * 验证手机号，根据工信部 2019 年最新公布的手机号段
 *
 * @example
 *
 * ```typescript
 * isMobile('13000000000')  // true
 * ```
 */
export const isMobile = (str: string) => /^(?:(?:\+|00)86)?1(?:3[\d]|4[5-7|9]|5[0-3|5-9]|6[5-7]|7[0-8]|8[\d]|9[189])\d{8}$/.test(str);

/**
 * 验证电话号码，规则为可选的区号（3 或 4 位）加横杠，后跟 7 或 8 位数字
 *
 * @example
 *
 * ```typescript
 * isPhone('010-12345678')  // true
 * ```
 */
export const isPhone = (str: string) => /^(?:\d{3}-)?\d{8}$|^(?:\d{4}-)?\d{7}$/.test(str);

/**
 * 验证 URL 地址
 *
 * @example
 *
 * ```typescript
 * isURL('https://www.qq.com')   // true
 * ```
 */
export const isURL = (str: string) => /^(?:https?:\/\/)?[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/.test(str);

/**
 * 验证迅雷地址
 *
 * @example
 *
 * ```typescript
 * isThunderURI('thunder://qufodhrwoi8vymouzhjpdmvyy2hpbmeuy29tl3nvd=')  // true
 * ```
 */
export const isThunderURI = (str: string) => /^thunderx?:\/\/[a-zA-Z\d]+=$/.test(str);

/**
 * 验证 ed2k 地址
 *
 * @example
 *
 * ```typescript
 * isEd2kURI('ed2k://|file|C6%A5%A3%A9%60.avi|/')     // true
 * ```
 */
export const isEd2kURI = (str: string) => /^ed2k:\/\/\|file\|.+\|\/$/.test(str);

/**
 * 验证磁力链接
 *
 * @example
 *
 * ```typescript
 * isMagnetURI('magnet:?xt=urn:btih:C510E15DB53588BDB089EF28F813FB21DFF4E93D')      // true
 * ```
 */
export const isMagnetURI = (str: string) => /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/.test(str);

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
export const isAShareCode = (str: string) => /^(?:s[hz]|S[HZ])\d{6}$/.test(str);

/**
 * 验证 md5，规则为 32 位十六进制数字（字母需要全大写或全小写）
 *
 * @example
 *
 * ```typescript
 * isMD5('0e37e09b702d2815e32be7c7b65a62da')    // true
 * ```
 */
export const isMD5 = (str: string) => /^[a-f\d]{32}|[A-F\d]{32}$/.test(str);

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
export const isVersionCode = (str: string) => /^\d+(?:\.\d+){2}(?:-(?:alpha|beta|rc)(\.\d+)?)?$/.test(str);

/**
 * 验证视频地址
 *
 * @example
 *
 * ```typescript
 * isVideoURL('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4')                      // true
 * isVideoURL('http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4')    // true
 * ```
 */
export const isVideoURL = (str: string) => /^https?:\/\/(?:.+\/)+.+\.(?:swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i.test(str);

/**
 * 验证图片地址
 *
 * @example
 *
 * ```typescript
 * isImageURL('https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00211-1923.jpg')   // true
 * ```
 */
export const isImageURL = (str: string) => /^https?:\/\/(?:.+\/)+.+\.(?:gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/.test(str);

/**
 * 验证 Linux 文件地址
 *
 * @example
 *
 * ```typescript
 * isLinuxFileAddress('/etc/nginx/nginx.conf')      // true
 * ```
 */
export const isLinuxFileAddress = (str: string) => /^\/(?:[^\/\s]+\/)*[^\/\s]+$/.test(str);

/**
 * 验证 Linux 隐藏文件地址
 *
 * @example
 *
 * ```typescript
 * isLinuxFileAddress('/home/vue-test/.gitignore')      // true
 * ```
 */
export const isLinuxHiddenFileAddress = (str: string) => /^\/(?:[^\/\s]+\/)*\.[^\/\s]+/.test(str);

/**
 * 验证 Windows 文件地址
 *
 * @example
 *
 * ```typescript
 * isWindowsFileAddress('C:\\Users\\app\\code\\index.html')      // true
 * ```
 */
export const isWindowsFileAddress = (str: string) => /^[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]+$/.test(str);

/**
 * 验证 Linux 文件夹地址
 *
 * @example
 *
 * ```typescript
 * isLinuxFolderAddress('/root/')      // true
 * ```
 */
export const isLinuxFolderAddress = (str: string) => /^\/(?:[^\/\s]+\/)*$/.test(str);

/**
 * 验证 Windows 文件夹地址
 *
 * @example
 *
 * ```typescript
 * isWindowsFolderAddress('D:\\')      // true
 * ```
 */
export const isWindowsFolderAddress = (str: string) => /^[a-zA-Z]:\\(?:[^\\\s]+\\)*$/.test(str);

/**
 * 验证 Linux 路径，包含文件地址和文件夹地址
 *
 * @example
 *
 * ```typescript
 * isLinuxPath('/home/')            // true
 * isLinuxPath('/home/index.html')  // true
 * ```
 */
export const isLinuxPath = (str: string) => /^\/(?:[^\/\s]+\/)*[^\/\s]*$/.test(str);

/**
 * 验证 Windows 路径，包含文件地址和文件夹地址
 *
 * @example
 *
 * ```typescript
 * isWindowsPath('D:\\')         // true
 * isWindowsPath('D:\\1.md')     // true
 * ```
 */
 export const isWindowsPath = (str: string) => /^[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]*$/.test(str);

/**
 * 验证路径，包含 Linux 和 Windows 的文件地址和文件夹地址
 *
 * @example
 *
 * ```typescript
 * isPath('D:\\')                // true
 * isPath('D:\\1.md')            // true
 * isPath('/home/')             // true
 * isPath('/home/index.html')   // true
 * ```
 */
export const isPath = (str: string) => /^\/(?:[^\/\s]+\/)*[^\/\s]*|[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]*$/.test(str);

/**
 * 验证 12 小时制时间格式（hh:mm:ss）
 *
 * @example
 *
 * ```typescript
 * is12Time('10:05:35')     // true
 * is12Time('20:05:35')     // false
 * is12Time('string')       // false
 * ```
 */
export const is12Time = (str: string) => /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/.test(str);

/**
 * 验证 24 小时制时间格式（HH:mm:ss）
 *
 * @example
 *
 * ```typescript
 * is24Time('10:05:35')     // true
 * is24Time('20:05:35')     // true
 * is24Time('string')       // false
 * ```
 */
export const is24Time = (str: string) => /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(str);

/**
 * 验证 base64 字符串
 *
 * @example
 *
 * ```typescript
 * isBase64('data:image/png;base64,iVB')    // true
 * ```
 */
export const isBase64 = (str: string) => /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(str);

/**
 * 验证中文名
 *
 * @example
 *
 * ```typescript
 * isChineseName('ming')   // false
 * isChineseName('小明')   // true
 * ```
 */
export const isChineseName = (str: string) => /^[\u4e00-\u9fa5·]{2,16}$/.test(str);

/**
 * 验证英文名
 *
 * @example
 *
 * ```typescript
 * isEnglishName('ming')   // true
 * isEnglishName('小明')   // false
 * ```
 */
export const isEnglishName = (str: string) => /^[a-zA-Z]+[a-zA-Z\s]{0,20}[a-zA-Z]+$/.test(str);

/**
 * 验证银行卡号
 *
 * @example
 *
 * ```typescript
 * isBankCardCode('000')                    // false
 * isBankCardCode('6212263602033054274')    // true
 * ```
 */
export const isBankCardCode = (str: string) => {
    if (!/^62\d{11,17}$/.test(str)) {
        return false;
    }

    // 校验码规则
    // 1. 取出除最后一位的每一位
    // 2. 奇数位乘以 2，偶数位不变
    // 3. 各数相加
    // 4. 除以 10 求余数
    // 5. 用 10 减去余数
    // 6. 与最后一位作比对
    const numArr = str.split('').map(Number);

    //const verifyCode = 10 - (numArr |> initial |> (arr => map(arr, (num, index) => index % 2 ? num : num * 2)) |> sum) % 10;
    const verifyCode = 10 - (sum((arr => map(arr, (num, index) => index % 2 ? num : num * 2))(initial(numArr)))) % 10;

    return verifyCode === last(numArr);
};

/**
 * 验证新能源车车牌号
 *
 * @example
 *
 * ```typescript
 * isNewEnergyCarNumber('浙AD12345')    // true
 * ```
 */
export const isNewEnergyCarNumber = (str: string) => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z][A-HJ-NP-Z](?:[0-9]{5}[DF]|[DF][A-HJ-NP-Z0-9][0-9]{4})$/.test(str);

/**
 * 验证非新能源车车牌号
 *
 * @example
 *
 * ```typescript
 * isNonNewEnergyCarNumber('京L50137')    // true
 * ```
 */
export const isNonNewEnergyCarNumber = (str: string) => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z][A-HJ-NP-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/.test(str);

/**
 * 验证车牌号
 *
 * @example
 *
 * ```typescript
 * isCarNumber('浙AD12345')    // true
 * isCarNumber('京L50137')     // true
 * ```
 */
export const isCarNumber = (str: string) => isNewEnergyCarNumber(str) || isNonNewEnergyCarNumber(str);

/**
 * 验证护照号码
 *
 * @example
 *
 * ```typescript
 * isPassportNumber('EF1260892')    // true
 * ```
 */
export const isPassportNumber = (str: string) => /^[EeKkGgDdSsPpHh]\d{8}$|(^(?:[Ee][a-fA-F]|[DdSsPp][Ee]|[Kk][Jj]|[Mm][Aa]|1[45])\d{7}$)/.test(str);

/**
 * 验证 IPv4 地址
 *
 * @example
 *
 * ```typescript
 * isIPv4('111.13.140.18')    // true
 * ```
 */
export const isIPv4 = (str: string) => /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/.test(str);

/**
 * 验证 IPv6 地址
 *
 * @example
 *
 * ```typescript
 * isIPv6('2409:8c00:7821:15:40::3')    // true
 * ```
 */
export const isIPv6 = (str: string) => /^(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){5}:(?:[0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){4}:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){3}:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){2}:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)|(?:[0-9A-Fa-f]{1,4}:){0,5}:(?:(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)\.){3}(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)|::(?:[0-9A-Fa-f]{1,4}:){0,5}(?:(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)\.){3}(?:25[0-5]|1\d{2}|2[0-4]\d|[1-9]\d|\d)|[0-9A-Fa-f]{1,4}::(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4}|::(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:)$/.test(str);

/**
 * 验证英文
 *
 * @example
 *
 * ```typescript
 * isEnglish('你好')        // false
 * isEnglish('hello')       // true
 * ```
 */
export const isEnglish = (str: string) => /^[a-zA-Z]+$/.test(str);

/**
 * 验证中文
 *
 * @example
 *
 * ```typescript
 * isChinese('你好')        // true
 * isChinese('hello')       // false
 * ```
 */
export const isChinese = (str: string) => /^[\u4E00-\u9FA5]+$/.test(str);

/**
 * 验证小写字母
 *
 * @example
 *
 * ```typescript
 * isEnglishLower('A')      // false
 * isEnglishLower('a')      // true
 * ```
 */
export const isEnglishLower = (str: string) => /^[a-z]+$/.test(str);

/**
 * 验证大写字母
 *
 * @example
 *
 * ```typescript
 * isEnglishUpper('A')      // true
 * isEnglishUpper('a')      // false
 * ```
 */
export const isEnglishUpper = (str: string) => /^[A-Z]+$/.test(str);

/**
 * 验证数字字符串，不包含前导零
 *
 * @example
 *
 * ```typescript
 * isNumberString('0')     // true
 * isNumberString('15')    // true
 * isNumberString('-3')    // true
 * isNumberString('0.5')   // true
 * isNumberString('01')    // false
 * ```
 */
export const isNumberString = (str: string) => /^-?[1-9]\d*|0(?:.\d+)?$/.test(str);

/**
 * 验证整数字符串，
 *
 * @example
 *
 * ```typescript
 * isIntegerString('0')     // true
 * isIntegerString('15')    // true
 * isIntegerString('-3')    // true
 * isIntegerString('0.5')   // false
 * isIntegerString('01')    // false
 * ```
 */
export const isIntegerString = (str: string) => /^-?[1-9]\d*|0$/.test(str);

/**
 * 验证日期字符串，允许中间用横杠或点连接
 *
 * @example
 *
 * ```typescript
 * isDateString('2021-06-03')       // true
 * isDateString('1995.08.06')       // true
 * isDateString('2020-05.46')       // false
 * ```
 */
export const isDateString = (str: string) => /^\d{4}([-.])\d{2}\1\d{2}$/.test(str);

/**
 * 验证邮政编码
 *
 * @example
 *
 * ```typescript
 * isPostal('100065')       // true
 * isPostal('180123')       // false
 * ```
 */
export const isPostal = (str: string) => /^(?:0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(str);

/**
 * 验证 QQ 号，规则为 5 ~ 10 位的整数，其中第一位不能为零
 *
 * @example
 *
 * ```typescript
 * isQQ('10000')        // true
 * isQQ('123456')       // true
 * isQQ('100')          // false
 * isQQ('aaa')          // false
 * ```
 */
export const isQQ = (str: string) => /^[1-9]\d{4,9}$/.test(str);

/**
 * 验证金额，规则为整数或两位小数
 *
 * @example
 *
 * ```typescript
 * isMoney('12.34')     // true
 * isMoney('1.5')       // true
 * isMoney('1.583')     // false
 * isMoney('aaa')       // false
 * ```
 */
export const isMoney = (str: string) => /^\d+(?:\.\d{1,2})?$/.test(str);

/**
 * 验证用户名，规则为大写字母、小写字母和数字，4 ~ 16 位
 *
 * @example
 *
 * ```typescript
 * isUsername('1995gs123')      // true
 * ```
 */
export const isUsername = (str: string) => /^[a-zA-Z0-9_-]{4,16}$/.test(str);

/**
 * 验证微信号，规则为长度 6 ~ 20 位，以字母开头，后面可以跟字母，数字，横杠，下划线
 *
 * @example
 *
 * ```typescript
 * isWeixinCode('wk_21_show-me')        // true
 * ```
 */
export const isWeixinCode = (str: string) => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(str);

/**
 * 验证 Java 包名
 *
 * @example
 *
 * ```typescript
 * isJavaPackageName('com.didi.aurora.wk')  // true
 * ```
 */
export const isJavaPackageName = (str: string) => /^(?:[a-zA-Z_][a-zA-Z0-9_]*)+(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+$/.test(str);

/**
 * 验证 MAC 地址，十六进制数字支持大小写（但只能为大写或小写），分隔符支持冒号和横杠。
 *
 * @example
 *
 * ```typescript
 * isMacAddress('00-16-EA-AE-3C-40')        // true
 * isMacAddress('00:16:ea:ae:3c:40')        // true
 * ```
 */
export const isMacAddress = (str: string) => /^(?:(?:[0-9a-f]{2}:){5}|(?:[0-9a-f]{2}-){5})[0-9a-f]{2}|(?:(?:[0-9A-F]{2}:){5}|(?:[0-9A-F]{2}-){5})[0-9A-F]{2}$/i.test(str);

/**
 * 验证身份证号码
 *
 * @example
 *
 * ```typescript
 * isIdentity('hello')                  // false
 * isIdentity('99048219810811486X')     // false
 * isIdentity('41048219811311486X')     // false
 * isIdentity('410482810811486')        // true
 * isIdentity('41048219810811486X')     // true
 * isIdentity('530121198907165303')     // true
 * ```
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
        year = parseInt(str.slice(6, 8));
        month = parseInt(str.slice(8, 10));
        day = parseInt(str.slice(10, 12));
    } else {
        year = parseInt(str.slice(6, 10));
        month = parseInt(str.slice(10, 12));
        day = parseInt(str.slice(12, 14));
    }

    const date = new Date(year, month - 1, day);

    if (
        !(
            (date.getFullYear() === year || date.getFullYear() === year + 1900)
                && date.getMonth() + 1 === month
                && date.getDate() === day
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
 * 验证火车车次，规则为 `GCDZTSPKXLY` 或非零数字开头，后面跟 1 ~ 4 位数字
 *
 * @example
 *
 * ```typescript
 * isTrainNumber('Z201')        // true
 * isTrainNumber('G401')        // true
 * isTrainNumber('2063')        // true
 * isTrainNumber('string')      // false
 * ```
 *
 * */
export const isTrainNumber = (str: string) => /^[GCDZTSPKXLY1-9]\d{1,4}$/.test(str);

/**
 * 验证手机机身码，规则为 15 ~ 17 位数字
 *
 * @example
 *
 * ```typescript
 * isIMEI('356737118097895')    // true
 * ```
 */
export const isIMEI = (str: string) => /^\d{15,17}$/.test(str);

