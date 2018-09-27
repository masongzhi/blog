const ua = navigator.userAgent;

const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua);
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua);
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
const isIos = isIpad || isIphone;
const isWechat = /micromessenger/i.test(ua);
const isPC = !isAndroid && !isIos && !isWechat;

export { isAndroid, isIpad, isIos, isIphone, isWechat, isPC };
