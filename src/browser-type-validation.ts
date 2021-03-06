const ua = navigator.userAgent.toLowerCase();

/**
 * 是否是微信浏览器
 */
export const isWeiXin = () => /micromessenger/.test(ua);

/**
 * 是否是移动端
 */
export const isDeviceMobile = () => /android|webos|iphone|ipad|ipod|blackberry/.test(ua);

/**
 * 是否是 QQ 浏览器
 */
export const isQQBrowser = () => /mqqbrowser|qzone|qqbrowser|qbwebviewtype/.test(ua);

/**
 * 是否是爬虫
 */
export const isSpider = () => /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web spider|sogou orion spider/.test(ua);

/**
 * 是否是 iOS 系统
 */
export const isiOS = () => /iphone|ipad|ipod/.test(ua);

/**
 * 是否是 Android 系统
 */
export const isAndroid = () => /android/.test(ua);

/**
 * 是否是桌面端
 */
export const isPC = () => !isDeviceMobile();
