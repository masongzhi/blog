import floor from "lodash/floor";
import isNil from "lodash/isNil";
import Const from "../const";

export function fixedFloat(number, byte = 2) {
  if (!number) {
    return;
  }

  return parseFloat(number.toFixed(parseInt(byte)));
}

export function fixedFloatPro(number) {
  const left = Math.abs(number - fixedFloat(number));
  // 是 0.34999999999 的情况才 fix
  if (left < 0.00001) {
    return fixedFloat(number);
  }
  return number;
}

export function cutFloat(number, digits = 2) {
  if (!number || digits < 0) {
    return number;
  }

  number = fixedFloatPro(number);
  const isMinus = number < 0;
  if (isMinus) {
    number = number * -1;
  }
  const result = fixedFloatPro(floor(number, digits));
  return result * (isMinus ? -1 : 1);
}

export function toPercent(number) {
  if (isNil(number)) {
    return number;
  }

  return cutFloat(number * 100) + "%";
}

export function thousandBitSeparator(
  number,
  { digits = 2, symbol = ",", force = false } = {}
) {
  if ((number && isNil(number)) || !number) {
    return number;
  }
  number = cutFloat(number, digits);
  const arr = number.toString().split(".");
  arr[0] = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + symbol);
  if (force && arr[1]) {
    arr[1] = Number("0." + arr[1])
      .toFixed(2)
      .split(".")[1];
  }
  return arr.join(".");
}

export function nullToZero(number) {
  if (isNil(number)) {
    return 0;
  }
  return number;
}

export function removeSensitive(item) {
  // const文件控制脱敏开关
  if (!Const.IS_REMOVE_SENSITIVE || !item) {
    return item;
  }

  let res = item.toString();
  let longPat = /(\d{3})\d*(\d{4})/;
  let shortPat = /(\D{1})\D*(\D{1})/;
  // 两个字的名字
  if (res.length === 2) {
    res = res.replace(shortPat, "$1*");
    console.log(res.length);
  }
  // 三个字的名字
  if (res.length < 7 && res.length > 2) {
    res = res.replace(shortPat, "$1*$2");
  }
  // 手机号、银行卡、身份证号
  if (res.length > 7) {
    let mid = "";
    for (var i = 0; i < res.length - 7; i++) {
      mid += "*";
    }
    res = res.replace(longPat, `$1${mid}$2`);
  }
  return res;
}
