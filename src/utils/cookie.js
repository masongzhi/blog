export function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  let sExpires = '';
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires =
          vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
        break;
      case String:
        sExpires = '; expires=' + vEnd;
        break;
      case Date:
        sExpires = '; expires=' + vEnd.toUTCString();
        break;
    }
  }
  document.cookie =
    encodeURIComponent(sKey) +
    '=' +
    encodeURIComponent(sValue) +
    sExpires +
    (sDomain ? '; domain=' + sDomain : '') +
    (sPath ? '; path=' + sPath : '') +
    (bSecure ? '; secure' : '');
  return true;
}

export function delCookie(sKey) {
  setCookie(sKey, '', -1, '/', GetCookieDomain());
}

export function getCookie(cname) {
  let name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    var limit = ca[i];
    while (limit.charAt(0) === ' ') {
      limit = limit.substring(1);
    }
    if (limit.indexOf(name) === 0) {
      return limit.substring(name.length, limit.length);
    }
  }
  return '';
}

export function GetCookieDomain() {
  let host = document.location.hostname;
  const ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (ip.test(host) === true || host === 'localhost') return host;
  const regex = /([^]*).*/;
  const match = host.match(regex);
  if (typeof match !== 'undefined' && null !== match) host = match[1];
  if (typeof host !== 'undefined' && null !== host) {
    const strAry = host.split('.');
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + '.' + strAry[strAry.length - 1];
    }
  }
  return '.' + host;
}
