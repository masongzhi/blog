import dayjs from 'dayjs';

// function prefixZero(value) {
//   return +value >= 10 ? value : '0' + value;
// }

export function getFormatTime(dateTime, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!dateTime) {
    return '';
  }
  return dayjs(dateTime).format(format);
}

/** * 拿到凌晨时间 * @param date * @returns {Date} */
export function getDayStart(date = new Date(), days = 0) {
  return dayjs(date || new Date())
    .startOf('day')
    .add(days, 'day')
    .toDate();
}

/**
 *
 * @param currentTime 当前的时间
 * @param day 是否加减日期
 * @returns {number}返回的是当日零点的时间戳
 */
export function getDateTimestamp(currentTime, day) {
  return getCurrentMoment(currentTime || new Date())
    .add(day, 'day')
    .startOf('day')
    .valueOf();
}

/**
 * Get current time's Moment object with timezone,
 * if not pass timezone, use the app's default timezone
 *
 * @param {String} timezone
 * @return {Object} the Moment object
 */
export function getCurrentMoment(time) {
  return dayjs(time);
}

/**
 * 获取距离当前的时间差(5分钟前，1天前)
 * @param time
 * @returns {string}
 */
export function getTimeFromNow(time) {
  return dayjs(time).fromNow();
}
