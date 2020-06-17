/**
 * @description 两个日期的间隔天数
 * @param start
 * @param finish
 */
export const getDatePeriod = (start: Date, finish: Date) => Math.abs(start.getTime() - finish.getTime()) / (60 * 60 * 1000 * 24);

/**
 * @description 所在月的第一天
 * @param date
 */
export const getFirstDateInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

/**
 * @description 所在月的最后一天
 * @param date
 */
export const getLastDateInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

/**
 * @description 所在季度的第一天
 * @param date
 */
export const getFirstDateInQuarter = (date: Date) => new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);

/**
 * @description 所在季度的最后一天
 * @param date
 */
export const getLastDateInQuarter = (date: Date) => new Date(date.getFullYear(), (~~(date.getMonth() / 3) + 1) * 3, 0);

/**
 * @description 判断是否是闰年
 * @param date
 */
export const isLeapYear = (date: Date) => new Date(date.getFullYear(), 2, 0).getDate() === 29;

/**
 * @description 取得当前月份的天数
 * @param date
 */
export const getDaysInMonth3 = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
