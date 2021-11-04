const getUA = () => navigator.userAgent.toLowerCase();

/**
 * 是否是微信浏览器，原理是检查 UA 中是否包含 `micromessenger`。
 */
export const isWeiXin = () => /micromessenger/.test(getUA());

/**
 * 是否是移动端，原理是检查 UA 中是否包含 `android`、`webos`、`iphone`、`ipad`、`ipod` 或 `blackberry`。
 */
export const isDeviceMobile = () => /android|webos|iphone|ipad|ipod|blackberry/.test(getUA());

/**
 * 是否是 QQ 浏览器，原理是检查 UA 中是否包含 `mqqbrowser`、`qzone`、`qqbrowser` 或 `qbwebviewtype`。
 */
export const isQQBrowser = () => /mqqbrowser|qzone|qqbrowser|qbwebviewtype/.test(getUA());

/**
 * 是否是爬虫，原理是检查 UA 中是否包含各大 bot 的关键词。
 */
export const isSpider = () => /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web spider|sogou orion spider/.test(getUA());

/**
 * 是否是 iOS 系统，原理是检查 UA 中是否包含 `iphone`、`ipad` 或 `ipod`。
 */
export const isiOS = () => /iphone|ipad|ipod/.test(getUA());

/**
 * 是否是 Android 系统，原理是检查 UA 中是否包含 `android`。
 */
export const isAndroid = () => /android/.test(getUA());

/**
 * 是否是桌面端，原理是不匹配移动端的就是桌面端。
 */
export const isPC = () => !isDeviceMobile();
