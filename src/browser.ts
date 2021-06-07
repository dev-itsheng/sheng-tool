/**
 * 获取 URL 参数中指定名称对应的值，如果没找到，返回 `undefined`。
 *
 * @param name 参数名
 */
export const getQueryString = (name: string) => {
    const search = window.location.search.split('?')[1] || '';
    const reg    = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const result = search.match(reg);

    return result ? result[2] : undefined;
};

/**
 * 动态引入 JS CDN 文件，返回一个 Promise，当加载完毕时为 `resolve` 状态，加载失败后为 `reject`。
 *
 * 其中配置的 `defer` 和 `async` 对应 `<script>` 标签的两种属性
 *
 * @param src JS 文件地址
 * @param config 配置
 * @param config.defer 是否延迟加载，默认为 `true`
 * @param config.async 是否异步加载，默认为 `true`
 *
 * @example
 *
 * ```typescript
 * try {
 *     // 插入 Vue 库
 *     await injectScript('https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.js');
 *
 *     // 成功插入，接下来可以拿到 Vue 全局变量并操作
 *     const app = Vue.createApp({});
 * } catch (err) {
 *     // 插入失败
 *     console.log('加载 Vue 库失败，详情为：' + err.message);
 * }
 * ```
 */
export const injectScript = (src: string, config?: { defer?: boolean, async?: boolean }) => new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = 'text/javascript';

    script.defer   = config?.defer ?? true;
    script.async   = config?.async ?? true;
    script.src     = src;
    script.onload  = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
});

/**
 * 复制内容到剪贴板
 *
 * @param value 复制的值
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
 * 将页面平滑滚动到顶部
 *
 * @param millisecond 滚动持续的时长（单位为毫秒，默认为 1000）
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
 * 一些业务场景，如弹框出现时，需要禁止页面滚动，这是兼容安卓和 iOS 禁止页面滚动的解决方案
 *
 * 该函数返回另一个函数闭包，其存储了当前页面滚动位置，再次执行可以恢复页面状态。
 *
 * @example
 *
 * ```typescript
 * // ...用户执行一些操作，弹出弹框
 *
 * // 禁止页面滚动
 * const reverseScroll = preventScroll();
 *
 * // ...用户操作完毕，弹框关闭，页面恢复
 *
 * // 恢复页面滚动
 * reverseScroll();
 * ```
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
 * 判断元素是否在浏览器可视范围内，分为部分可见（默认）和完全可见两种情况
 *
 * @param el 被观察的元素
 * @param partiallyVisible 该元素是否「完全可见」才符合「可视范围」的标准，默认为 `false`
 */
export const elementIsVisibleInViewport = (el: Element, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();

    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
