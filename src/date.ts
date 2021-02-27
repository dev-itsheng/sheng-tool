/**
 * 获取两个日期的间隔天数
 */
export const getDatePeriod = (start: Date, finish: Date) => Math.abs(start.getTime() - finish.getTime()) / (60 * 60 * 1000 * 24);

/**
 * 获取所在月的第一天，如果不传参，则获取当前时间
 */
export const getFirstDateInMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1);

/**
 * 获取所在月的最后一天
 */
export const getLastDateInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

/**
 * 获取所在季度的第一天
 */
export const getFirstDateInQuarter = (date: Date) => new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);

/**
 * 获取所在季度的最后一天
 */
export const getLastDateInQuarter = (date: Date) => new Date(date.getFullYear(), (~~(date.getMonth() / 3) + 1) * 3, 0);

/**
 * 判断是否是闰年
 */
export const isLeapYear = (date: Date) => new Date(date.getFullYear(), 2, 0).getDate() === 29;

/**
 * 取得当前月份的天数
 */
export const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

/**
 * 获取当前月份的周数，取决于每周是从周日开始（默认）还是从周一开始
 */
export const getWeeksInMonth = (date: Date, firstDayOfWeek: 0 | 1 = 0) => {
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
            ? 5
            : 4;
}
