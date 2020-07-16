/*! jutils-v1.0.0-beta2 MIT */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.jutils=t():e.jutils=t()}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){let r={};const o=n(1);o.keys().forEach(e=>{if("./index.js"!==e)for(var t in o(e))r[t]=o(e)[t]}),e.exports=r},function(e,t,n){var r={"./array/array.js":2,"./browser/browser.js":3,"./cache/storage.js":4,"./date/date.js":5,"./devices/devices.js":6,"./index.js":0,"./mobile/mobile.js":7,"./string/string.js":8,"./url/url.js":9,"./validate/validate.js":10};function o(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=1},function(e,t){e.exports={arrayUnique:function(e){var t,n,r=[],o={};for(t=0,n=e.length;t<n;t++)o[e[t]]||(r.push(e[t]),o[e[t]]=!0);return r},arrayEqual:function(e,t){var n,r;if(!t)return!1;if(e.length!=t.length)return!1;for(n=0,r=e.length;n<r;n++)if(e[n]instanceof Array&&t[n]instanceof Array){if(!e[n].equals(t[n]))return!1}else if(e[n]!=t[n])return!1;return!0}}},function(e,t){var n={getBrowserInfo:function(){var e,t,n,r={name:"other",version:"0"},o=navigator.userAgent.toLowerCase();for(t=[["WeiXin",/micromessenger\/([^\s]+)/],["QQ",/qq\/([^\s]+)/],["QQBrowser",/(?:qqbrowser|qqlivebrowser)\/([^\s]+)/],["JDAPP",/jdapp;/],["QIHU",/qihu|360se/],["LieBao",/(?:lbbrowser|liebaofast)\/?([\d\.]+)?/],["Sogou",/(?:metasr|sogou[\w]*)[ \/]([\d\.]+)/],["Opera",/(?:opera|opr|oupeng)\/([\d\.]+)/],["BaiduBrowser",/(?:bidubrowser|baidubrowser)[\/ ]?([\d\.\w]+)/],["BaiduBox",/baiduboxapp|baiduboxpad/],["UC",/(?:ucweb|ucbrowser)\/?([\d\.]+)/],["Maxthon",/maxthon\/([\d\.]+)/],["Samsung",/samsungbrowser\/([\d\.]+)/],["Dolphin",/aphone|apad/],["2345",/2345/],["Miui",/miuibrowser\/([\d\.]+)/],["OppoBrowser",/oppobrowser\/([\d\.]+)/],["MeiZu",/mz-/],["Weibo",/weibo/],["Youku",/youku/],["NewsApp",/newsapp/],["AliApp",/aliapp/],["Firefox",/firefox\/([\d\.\w]+)/],["Chrome",/chrome\/([\d\.]+)/],["IE",/msie[ ](\d+\.\d+)/],["Safari",/safari\/([\d\.]+)/]],e=0;e<t.length;e++)if(n=o.match(t[e][1])){r.name=t[e][0],r.version=n[1]||"0";break}return r},isCss3Support:function(){var e,t,n,r={TransitionEvent:"transitionend",WebKitTransitionEvent:"webkitTransitionEnd",OTransitionEvent:"oTransitionEnd",otransitionEvent:"otransitionEnd"},o=!1;for(n in r){if(window[n]){e=r[n];break}try{document.createEvent(n),e=r[n];break}catch(e){}}for(n in"string"==typeof e&&(o=!0),r={AnimationEvent:"animationend",WebKitAnimationEvent:"webkitAnimationEnd"})if(window[n]){t=r[n];break}return"string"==typeof t&&(o=!0),o}};e.exports=n},function(e,t){var n={removeStorage:function(e){window.localStorage.removeItem(e)},saveStorage:function(e,t,n){try{window.localStorage.setItem(e,n?JSON.stringify(t):t)}catch(e){console.error(e)}},getStorage:function(e){return window.localStorage.getItem(e)},isSupportStorage:function(){if(!window.localStorage)return!1;try{return window.localStorage.setItem("JUTILS_STOARGE_TEST",!0),window.localStorage.removeItem("JUTILS_STOARGE_TEST"),!0}catch(e){return!1}}};e.exports=n},function(e,t){var n={getTimeInterval:function(e,t){var n=[0,0,0,0],r="",o=t>e?parseInt((t-e)/1e3):0;return n[0]=o>86400?parseInt(o/86400):0,o-=86400*n[0],n[1]=o>3600?parseInt(o/3600):0,o-=3600*n[1],n[2]=o>60?parseInt(o/60):0,n[3]=o-60*n[2],r=n[0]>0?n[0]+"天":"",r+=n[0]<=0&&n[1]<=0?"":n[1]+"小时",r+=n[0]<=0&&n[1]<=0&&n[2]<=0?"":n[2]+"分钟",r+=n[0]<=0&&n[1]<=0&&n[2]<=0&&n[3]<=0?"":n[3]+"秒"},formatDate:function(e,t){function n(e,t){for(var n=0,r=t-(e+"").length;n<r;n++)e="0"+e;return e+""}return t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,n(e.getFullYear()%100,2)).replace(/mm|MM/,n(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,n(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,n(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,n(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,n(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds()).replace(/w/g,e.getDay()).replace(/W/g,["日","一","二","三","四","五","六"][e.getDay()])}};e.exports=n},function(e,t){var n={getOsInfo:function(e){e=e||navigator.userAgent;for(var t={os:"other",version:""},n=[["android",/Android;?[\s\/]+([\d.]+)?/],["android",/jdapp;android;[\d.]+;([\d.]+);/],["android",/[aA]ndroid;/],["ipad",/iPad;.*?OS\s([\d_]+)/],["ipod",/iPod(?:\stouch)?;.*?\sOS\s([\d_]+)?/],["iphone",/CPU\siPhone\s(?:OS\s)?([\d_]+)/],["windows",/Windows NT/],["mac",/Macintosh;.*?Mac OS X\s([\d._]+)/],["windows phone",/Windows Phone\s([\d.]+)?/],["symbianos",/SymbianOS\/([\d.]+)?/],["bb",/BlackBerry|BB10|RIM Tablet OS\s([\d.]+)?/],["linux",/linux/i]],r=0;r<n.length;r++){var o=n[r],i=e.match(o[1]);if(i){t.os=o[0],t.version=(i[1]||"").replace(/_/g,".");break}}return t}};e.exports=n},function(e,t){var n={isSQ:function(){return!!/qq\/([\d\.]+)*/i.test(navigator.userAgent)},isWX:function(){return!!/MicroMessenger/i.test(navigator.userAgent)},getOperator:function(e,t){var n=e||"",r=n.substring(0,3),o=n.substring(0,4),i=!!/^1\d{10}$/.test(n)&&("130,131,132,155,156,185,186,145,176".indexOf(r)>=0?"联通":"133,153,180,181,189,177,173,170".indexOf(r)>=0?"电信":"1349"==o?"电信":"134,135,136,137,138,139,150,151,152,157,158,159,187,188,147,182,183,184,178".indexOf(r)>=0?"移动":"未知");return t||i||!/^1\d{2}\*{4}\d{4}$/.test(n)||(i=!0),i}};e.exports=n},function(e,t){var n={getCookie:function(e){var t=new RegExp("(^| )"+decodeURIComponent(e)+"(?:=([^;]*))?(;|$)"),n=document.cookie.match(t);return n?n[2]?decodeURIComponent(n[2]):"":null},setCookie:function(e,t,n,r,o,i){var a=new Date;r=arguments[3]||"/",o=arguments[4]||null,i=arguments[5]||!1,(n=arguments[2]||null)&&a.setMinutes(a.getMinutes()+parseInt(n)),document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+(n?";expires="+a.toGMTString():"")+(r?";path="+r:"")+(o?";domain="+o:"")+(i?";secure":"")},delCookie:function(e,t,n,r){if(null!=this.getCookie(e)){var o=new Date;o.setMinutes(o.getMinutes()-1e3),t=t||"/",document.cookie=encodeURIComponent(e)+"=;expires="+o.toGMTString()+(t?";path="+t:"")+(n?";domain="+n:"")+(r?";secure":"")}},time33:function(e){for(var t=5381,n=e.length,r=0;r<n;++r)t+=(t<<5)+e.charCodeAt(r);return 2147483647&t},ltrim:function(e,t){e=e.toString();var n=t?new RegExp("^["+t+"]+","g"):/^\s+/g;return e.replace(n,"")},rtrim:function(e,t){e=e.toString();for(var n=t?new RegExp("["+t+"]"):/\s/,r=e.length-1;0<=r&&n.test(e[r]);)r--;return r<e.length?e.substr(0,r+1):e},trim:function(e,t){return this.rtrim(this.ltrim(e,t),t)},strSubGB:function(e,t,n,r){if(e.replace(/[\u00FF-\uFFFF]/g,"  ").length>n-t){r=r||"";var o=e.replace(/[\u00FF-\uFFFF]/g,"@-").substr(t,n),i=o.match(/@-/g)?o.match(/@-/g).length:0;return e.substring(0,n-i)+r}return e},guidGenerator:function(){var e=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?n:3&n|8).toString(16)})},randomScope:function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},getSafeRandomNum:function(){return window.crypto?window.crypto.getRandomValues(new Uint32Array(1))[0]/4294967296:window.msCrypto.getRandomValues(new Uint32Array(1))[0]/4294967296},UUID:function(){function e(e,t){if(e.length<t){var n=[];n.length=t-e.length+1,e+=n.join("0")}else e.length>t&&(e=e.substr(0,t));return e}function t(e){return""===e?"":e.toString(16)}function n(e){for(var n="",r=0;r<e;r++)n+=t(Math.floor(16*Math.random()));return n}var r=new Date,o=r.getMilliseconds(),i=r.getTime(),a=t(1e6*o),u=t(i);return a=e(a,5),u=e(u,6),""+a+n(3)+"-"+n(4)+"-"+n(4)+"-"+n(4)+"-"+u+n(6)}};e.exports=n},function(e,t){var n={getQuery:function(e,t){var n=arguments[1]||window.location.search,r=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=n.substr(n.indexOf("?")+1).match(r);return null!=o?o[2]:""},setQuery:function(e,t){var n=t?t.match(/#.*/)&&t.match(/#.*/)[0]||"":location.hash,r=t?t.replace(/#.*/,"").match(/\?.*/)&&t.replace(/#.*/,"").match(/\?.*/)[0]||"":location.search,o=t?t.replace(/#.*/,"").replace(/\?.*/,""):location.protocol+"//"+location.host+location.pathname;for(var i in e){var a=i+"="+e[i],u=getQuery(i,r);r=u?r.replace(i+"="+u,i+"="+e[i]):r.length>0?r+"&"+a:"?"+a}return o+r+n},getUrlParam:function(e){var t=arguments[1]||window.location.search,n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),r=t.substr(t.indexOf("?")+1).match(n);return null!=r?r[2]:""},urlSearchParams:function(e){var t=e||"undefined"!=typeof location&&location.search;if(!t)return{};t=(t=t.trim().replace(/^(\?)/,"")).split("&");var n={};return t.forEach(function(e){var t=e.split("=");n[t[0]]=!(1<t.length)||t[1]}),n},getHash:function(e){var t=arguments[1]||location.hash,n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=t.substr(t.indexOf("#")+1).match(n);return null!=r?r[2]:""},replaceParam:function(e,t,n,r){n=n||location.href;var o=new RegExp("([\\?&]"+e+"=)[^&#]*");return n.match(o)?r?n.replace(o,"$1"+t):n:-1==n.indexOf("?")?n+"?"+e+"="+t:n+"&"+e+"="+t},loadCss:function(e){var t=document.createElement("link");t.setAttribute("type","text/css"),t.setAttribute("rel","stylesheet"),t.setAttribute("href",e),document.getElementsByTagName("head")[0].appendChild(t)},loadonJS:function(e,t,n){"string"==typeof t&&(n=t,t=function(){});var r=document.createElement("script"),o=document.getElementsByTagName("head")[0];r.setAttribute("charset",n||"utf-8"),r.src=e,r.onload=function(){t&&t(),o.removeChild(r)},o.appendChild(r)}};e.exports=n},function(e,t){var n={checkUserId:function(e){var t,n,r,o,i,a,u,s;if(i=["1","0","x","9","8","7","6","5","4","3","2"],a=["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],t="",!e)return"身份证号码不能为空";if(18!=e.length)return"身份证号码长度应该为18位";if(18==e.length?t=e.substring(0,17):15==e.length&&(t=e.substring(0,6)+"19"+e.substring(6,15)),!/^\d+$/.test(t))return"身份证格式错误";if(n=t.substring(6,10),r=t.substring(10,12),o=t.substring(12,14),0==/[1-9]\d{3}\-(0[1-9]|1[0-2])\-([0-2]\d|3[0-1])/.test(n+"-"+r+"-"+o))return"身份证生日无效。";if((new Date).getFullYear()-n>150||(new Date).getTime()-new Date(n,r-1,o).getTime()<0)return"身份证生日不在有效范围";if(r>12||0==r)return"身份证月份无效";if(o>31||0==o)return"身份证日期无效";if(!{11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}[t.substring(0,2)])return"身份证地区编码错误";for(s=0,u=0;u<17;u++)s+=t.charAt(u)*a[u];return t+=i[s%11],18!=e.length?"":t!=e.toLowerCase()?"不是合法的身份证号码":""}};e.exports=n}])});