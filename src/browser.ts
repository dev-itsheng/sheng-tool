/**
 * 获取 URL 参数中指定名称对应的值，如果没找到，返回 `undefined`。
 *
 * @param name 参数名
 */
export const getQueryString = (name: string) => {
    const search = window.location.search.split('?')[1] || '';
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const result = search.match(reg);

    return result ? result[2] : undefined;
};

/**
 * 将 URL 片段与当前域名拼合，组成完成 URL。
 *
 * @param url URL 片段，为域名后面的内容（不包含开头的斜杠）
 *
 * @example
 *
 * ```typescript
 * // 假设当前域名为 https://www.example.com
 * getFullUrl('edit.html?query=1')      // 'https://www.example.com/edit.html?query=1'
 * ```
 */
export const getFullUrl = (url: string) => `${location.origin}/${url}`;

/**
 * 动态引入 JS CDN 文件，返回一个 Promise，当加载完毕时为 `resolve` 状态，加载失败后为 `reject`。
 *
 * 其中配置的 `defer` 和 `async` 对应 `<script>` 标签的两种属性。
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
 *     await injectScriptBySrc('https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.js');
 *
 *     // 成功插入，接下来可以拿到 Vue 全局变量并操作
 *     const app = Vue.createApp({});
 * } catch (err) {
 *     // 插入失败
 *     console.log('加载 Vue 库失败，详情为：' + err.message);
 * }
 * ```
 */
export const injectScriptBySrc = (src: string, config?: { defer?: boolean, async?: boolean }) => new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = 'text/javascript';

    script.defer = config?.defer ?? true;
    script.async = config?.async ?? true;
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
});

/**
 * 动态引入 JS 字符串，返回一个 Promise，当加载完毕时为 `resolve` 状态，加载失败后为 `reject`。
 *
 * 其中配置的 `defer` 和 `async` 对应 `<script>` 标签的两种属性。
 *
 * @param text JS 字符串
 * @param config 配置
 * @param config.defer 是否延迟加载，默认为 `true`
 * @param config.async 是否异步加载，默认为 `true`
 *
 * @example
 *
 * ```typescript
 * try {
 *     // 加载自定义字符串并执行
 *     await injectScriptByText('var globalVariable = 1');
 *
 *     // 执行成功，接下来可以拿到 globalVariable 全局变量并操作
 *     console.log(globalVariable);
 * } catch (err) {
 *     // 执行失败
 *     console.log('代码执行失败' + err.message);
 * }
 * ```
 */
export const injectScriptByText = (text: string, config?: { defer?: boolean, async?: boolean }) => new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = 'text/javascript';

    script.defer = config?.defer ?? true;
    script.async = config?.async ?? true;
    script.innerHTML = text;
    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
});


/**
 * 将页面平滑滚动到顶部。
 *
 * @param millisecond 滚动持续的时长（单位为毫秒，默认为 1000）
 */
export const scrollToTop = (millisecond: number = 1000) => {
    const totalTimes = Math.round(millisecond / (1000 / 60));
    const currentScrollTop = document.documentElement.scrollTop;
    let currentTimes = 0;

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
 * 一些业务场景，如弹框出现时，需要禁止页面滚动，这是兼容安卓和 iOS 禁止页面滚动的解决方案。
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
    document.body.style.overflowY = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = -scrollTop + 'px';
    document.body.style.overscrollBehavior = 'none';

    return () => {
        document.body.style.overflowY = 'auto';
        document.body.style.position = 'static';
        window.scrollTo(0, scrollTop);
    };
};

/**
 * 判断元素是否在浏览器可视范围内，分为部分可见（默认）和完全可见两种情况。
 *
 * @param el 被观察的元素
 * @param partiallyVisible 该元素是否「完全可见」才符合「可视范围」的标准，默认为 `false`
 */
export const elementIsVisibleInViewport = (el: Element, partiallyVisible = false) => {
    const {top, left, bottom, right} = el.getBoundingClientRect();

    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

/**
 * Promise 形式的等待，等待指定毫秒数后 resolve 空值。
 *
 * @param milliseconds 毫秒数
 *
 * @example
 *
 * ```typescript
 * (async () => {
 *     console.log(1);      // 输出 1
 *     await wait(350);     // 等待 350 毫秒
 *     console.log(2);      // 输出 2
 * })();
 * ```
 */
export const wait = (milliseconds: number) => new Promise<void>(resolve => setTimeout(() => resolve(), milliseconds));

/**
 * Promise 形式的等待，与 `wait` 不一样的是，它等待的单位是秒。
 *
 * @param seconds 秒数
 *
 * @example
 *
 * ```typescript
 * (async () => {
 *     console.log(1);                  // 输出 1
 *     await waitForSeconds(1.5);       // 等待 1.5 秒
 *     console.log(2);                  // 输出 2
 * })();
 * ```
 */
export const waitForSeconds = (seconds: number) => wait(seconds * 1000);

/**
 * 复制文本，兼容 IE9（需要 Promise Polyfill）。
 *
 * @param text 被复制的文本
 *
 * @example
 *
 * ```typescript
 * (async () => {
 *     const text = await copyText('hello world');
 *     // 此时按 Ctrl / Command + V 即可粘贴「hello world 文本」
 * }
 * ```
 */
export const copyText = (text: string) => {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise<void>(resolve => {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.style.top = '-99999px';
        textarea.style.left = '-99999px';
        textarea.style.position = 'absolute';
        textarea.value = text;
        textarea.focus();
        textarea.setSelectionRange(0, text.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);
        resolve();
    })
};

/**
 * 复制 HTML，一般用于富文本编辑器的场合。
 *
 * @param html 被复制的 HTML 字符串
 *
 * @example
 *
 * ```typescript
 * (async () => {
 *     const text = await copyHTML('<ul><li>hello</li><li>world</li></ul>');
 *     // 此时按 Ctrl / Command + V 到富文本编辑器中即可粘贴「hello」和「world」的有序列表
 * }
 * ```
 */
export const copyHTML = (html: string) => {
    if (navigator.clipboard) {
        // 由于 typedoc 库限制 TypeScript 版本（~4.2），TypeScript 无法识别新版 BOM API navigator.clipboard.write 及 ClipboardItem 的类型，所以直接忽略掉这一行的类型检查
        // @ts-ignore
        return navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }) })]);
    }

    return Promise.reject(new Error('clipboard API is not supported'));
};

/**
 * 异步地获取一些值。
 *
 * 在有些场景时，一些值无法通过同步的方法拿到，甚至异步的方法也不行，只能通过轮询。
 *
 * 具体也就是说，每隔一段时间（默认 50ms）看一下值有没有获取到，获取到返回包裹该值的 Promise，并就关掉定时器。
 *
 * @param fn                获取值的方法
 * @param ms                间隔时间，默认 50ms
 * @param excludeValues     排除值列表，默认为 [null, undefined]，只有返回值不在该列表中才认为获取到，使用 includes 方法判断
 *
 * @example
 *
 * ```typescript
 * // 在 MVVM 框架中，DOM 会等到数据加载完成之后才渲染，但我们需要在源码之外的地方获取 DOM
 * (async () => {
 *     const dom = await getAsyncValue(() => document.getElementById('app'));
 *     const attr = dom.getAttribute('something');
 *     // 处理 attr
 * }
 * ```
 */
export const getAsyncValue = <T = any>(fn: () => T, ms = 50, excludeValues = [null, undefined]) =>
    new Promise<T>((resolve) => {
        const timer = setInterval(() => {
            const val = fn();

            if (!excludeValues.includes(val as any)) {
                clearInterval(timer);
                resolve(val);
            }
        }, ms);
    });
