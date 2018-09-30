export function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  var sExpires = '';
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
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var limit = ca[i];
    while (limit.charAt(0) == ' ') {
      limit = limit.substring(1);
    }
    if (limit.indexOf(name) == 0) {
      return limit.substring(name.length, limit.length);
    }
  }
  return '';
}

export function GetCookieDomain() {
  var host = location.hostname;
  var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (ip.test(host) === true || host === 'localhost') return host;
  var regex = /([^]*).*/;
  var match = host.match(regex);
  if (typeof match !== 'undefined' && null !== match) host = match[1];
  if (typeof host !== 'undefined' && null !== host) {
    var strAry = host.split('.');
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + '.' + strAry[strAry.length - 1];
    }
  }
  return '.' + host;
}
