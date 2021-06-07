/**
 * 获取两个日期的间隔天数
 *
 * @param start 起始日期
 * @param finish 结束日期
 *
 * @example
 *
 * ```typescript
 * getDatePeriod(new Date('2021/03/28'), new Date('2021/03/29'))    // 1
 * ```
 */
export const getDatePeriod = (start: Date, finish: Date) => Math.abs(start.getTime() - finish.getTime()) / (60 * 60 * 1000 * 24);

/**
 * 获取指定时间所在月的第一天，如果不传参，则指定当前时间
 *
 * @param date 指定时间
 *
 * @example
 *
 * ```typescript
 * getFirstDateInMonth(new Date('2021/03/05'))      // new Date('2021/03/01')
 * ```
 */
export const getFirstDateInMonth = (date = new Date) => new Date(date.getFullYear(), date.getMonth(), 1);

/**
 * 获取指定时间所在月的最后一天，如果不传参，则指定当前时间
 *
 * @param date 指定时间
 *
 * @example
 *
 * ```typescript
 * getLastDateInMonth(new Date('2021/03/05'))       // new Date('2021/03/31')
 * ```
 */
export const getLastDateInMonth = (date = new Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

/**
 * 获取指定时间所在季度的第一天，如果不传参，则指定当前时间
 *
 * @param date 指定时间
 *
 * @example
 *
 * ```typescript
 * getFirstDateInQuarter(new Date('2021/03/28'))    // new Date('2021/01/01')
 * ```
 */
export const getFirstDateInQuarter = (date = new Date) => new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);

/**
 * 获取指定时间所在季度的最后一天，如果不传参，则指定当前时间
 *
 * @param date 指定时间
 *
 * @example
 *
 * ```typescript
 * getLastDateInQuarter(new Date('2021/03/28'))    // new Date('2021/03/31')
 * ```
 */
export const getLastDateInQuarter = (date = new Date) => new Date(date.getFullYear(), Math.floor((date.getMonth() + 1) / 3) * 3, 0);

/**
 * 判断指定时间是否是闰年，如果不传参，则判断当年
 *
 * @param date 指定时间
 *
 * @example
 *
 * ```typescript
 * isLeapYear(new Date('2021/03/01'))     // false
 * isLeapYear(new Date('2020/09/03'))     // true
 * ```
 */
export const isLeapYear = (date = new Date) => new Date(date.getFullYear(), 2, 0).getDate() === 29;

/**
 * 取得指定时间所在月份的天数，如果不传参，则指定当前时间
 *
 * @param date 指定时间
 *
 * @example
 *
 * ```typescript
 * getDaysInMonth(new Date('2021/03/01'))     // 31
 * getDaysInMonth(new Date('2021/02/05'))     // 28
 * getDaysInMonth(new Date('2020/09/03'))     // 30
 * getDaysInMonth(new Date('2024/02/08'))     // 29
 * ```
 */
export const getDaysInMonth = (date = new Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

/**
 * 获取当前月份的周数，取决于每周是从周日开始（默认）还是从周一开始
 *
 * @param date 指定时间
 * @param firstDayOfWeek 若设为 `0`（默认值），则每周从周日开始，设为 `1` 则为从周一开始
 *
 * @example
 *
 * ```typescript
 * getWeeksInMonth(new Date('2021/03/28'))      // 5
 * ```
 */
export const getWeeksInMonth = (date = new Date, firstDayOfWeek: 0 | 1 = 0) => {
    // 先计算出本月的第一天是周几
    const dayOfFirstDateInMonth = getFirstDateInMonth(date).getDay(),
          daysInMonth = getDaysInMonth(date);

    return (
        (
            daysInMonth === 31 && (
                (firstDayOfWeek === 0 && [5, 6].includes(dayOfFirstDateInMonth)) ||
                (firstDayOfWeek === 1 && [0, 6].includes(dayOfFirstDateInMonth))
            )
        ) || (
            daysInMonth === 30 && (
                (firstDayOfWeek === 0 && dayOfFirstDateInMonth === 6) ||
                (firstDayOfWeek === 1 && dayOfFirstDateInMonth === 0)
            )
        )
    )
        ? 6
        : daysInMonth === 28 && firstDayOfWeek === dayOfFirstDateInMonth
            ? 4
            : 5;
}
