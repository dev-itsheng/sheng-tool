/**
 * 获取 URL 参数
 * @param {string} name 参数名
 */
export const getQueryString = (name: string) => {
    const search = window.location.search.split('?')[1] || '';
    const reg    = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const result = search.match(reg);

    return result ? result[2] : undefined;
};

/**
 * 动态引入 JS
 * @param {string} src JS 文件地址
 */
export const injectScript = (src: string) => {
    const script = document.createElement('script');

    script.type  = 'text/javascript';
    script.async = true;
    script.src   = src;

    document.body.appendChild(script);
};

/**
 * 复制内容到剪贴板
 * @param {string} value 复制的值
 */
export const copyTextToClipboard = (value: string) => {
    const textarea            = document.createElement('textarea');
    textarea.style.background = 'transparent';
    textarea.value            = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.removeChild(textarea);
};

/**
 * @description 滚动到顶部
 * @param {number} millisecond 毫秒数，默认为 1000
 */
export const scrollToTop = (millisecond: number = 1000) => {
    const totalTimes       = Math.round(millisecond / (1000 / 60));
    const currentScrollTop = document.documentElement.scrollTop;
    let currentTimes       = 0;

    const animationFunction = () => {
        document.documentElement.scrollTop -= currentScrollTop / totalTimes;
        currentTimes++;

        if (currentTimes < totalTimes) {
            requestAnimationFrame(animationFunction);
        }
    };

    requestAnimationFrame(animationFunction);
};


/**
 * 功能描述：一些业务场景，如弹框出现时，需要禁止页面滚动，这是兼容安卓和 iOS 禁止页面滚动的解决方案
 */
export const preventScroll = () => {
    // 存储当前滚动位置
    const scrollTop = window.scrollY;

    // 将可滚动区域固定定位，可滚动区域高度为 0 后就不能滚动了
    document.body.style.overflowY          = 'hidden';
    document.body.style.position           = 'fixed';
    document.body.style.width              = '100%';
    document.body.style.top                = -scrollTop + 'px';
    document.body.style.overscrollBehavior = 'none';

    return () => {
        document.body.style.overflowY = 'auto';
        document.body.style.position  = 'static';
        window.scrollTo(0, scrollTop);
    };
};

/**
 * 判断元素是否在可视范围内，partiallyVisible 为是否为完全可见
 */
export const elementIsVisibleInViewport = (el: Element, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();

    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
