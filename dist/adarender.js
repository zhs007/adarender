!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("echarts")):"function"==typeof define&&define.amd?define(["echarts"],t):"object"==typeof exports?exports.adarender=t(require("echarts")):e.adarender=t(e.echarts)}(window,function(n){return i={},a.m=r=[function(e,t){e.exports=n},function(e,t,n){var r=n(2),a=n(3);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var i={insert:"head",singleton:!1},o=(r(e.i,a,i),a.locals?a.locals:{});e.exports=o},function(e,t,i){"use strict";var n,r,a=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},o=(r={},function(e){if(void 0===r[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}r[e]=t}return r[e]}),d={};function l(e,t,n){for(var r=0;r<t.length;r++){var a={css:t[r][1],media:t[r][2],sourceMap:t[r][3]};d[e][r]?d[e][r](a):d[e].push(g(a,n))}}function s(e){var t=document.createElement("style"),n=e.attributes||{};if(void 0===n.nonce){var r=i.nc;r&&(n.nonce=r)}if(Object.keys(n).forEach(function(e){t.setAttribute(e,n[e])}),"function"==typeof e.insert)e.insert(t);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var c,u=(c=[],function(e,t){return c[e]=t,c.filter(Boolean).join("\n")});function h(e,t,n,r){var a=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=u(t,a);else{var i=document.createTextNode(a),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(i,o[t]):e.appendChild(i)}}var f=null,p=0;function g(t,e){var n,r,a;if(e.singleton){var i=p++;n=f=f||s(e),r=h.bind(null,n,i,!1),a=h.bind(null,n,i,!0)}else n=s(e),r=function(e,t,n){var r=n.css,a=n.media,i=n.sourceMap;if(a?e.setAttribute("media",a):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}.bind(null,n,e),a=function(){!function(e){if(null===e.parentNode)return;e.parentNode.removeChild(e)}(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else a()}}e.exports=function(n,e,r){return(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=a()),n=r.base?n+r.base:n,e=e||[],d[n]||(d[n]=[]),l(n,e,r),function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){d[n]||(d[n]=[]),l(n,e,r);for(var t=e.length;t<d[n].length;t++)d[n][t]();d[n].length=e.length,0===d[n].length&&delete d[n]}}}},function(e,t,n){(t=n(4)(!1)).push([e.i,"@media screen and (min-width: 1029px) {\n  .adarender {\n    width: 960px;\n    margin: 0 auto;\n    font-size: 16px;\n  }\n  .adarender h1 {\n    font-size: 32px;\n  }\n  .adarender h2,\n  .adarender h3,\n  .adarender h4,\n  .adarender h5,\n  .adarender h6 {\n    font-size: 20px;\n  }\n  .adarender p {\n    font-size: 16px;\n  }\n  p.caption {\n    font-size: 14px;\n    color: #333 !important;\n    text-align: center;\n  }\n}\n@media screen and (max-width: 1024px) {\n  .adarender {\n    max-width: 640px;\n    margin: 0 auto;\n    font-size: 24px;\n  }\n  .adarender h1 {\n    font-size: 32px;\n  }\n  .adarender h2,\n  .adarender h3,\n  .adarender h4,\n  .adarender h5,\n  .adarender h6 {\n    font-size: 28px;\n  }\n  .adarender p {\n    font-size: 24px;\n  }\n  p.caption {\n    font-size: 20px;\n    color: #333 !important;\n    text-align: center;\n  }\n}\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',\n    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,\n    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n.adarender .icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n.adarender table {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n.adarender table {\n  display: block;\n  overflow: auto;\n  width: 100%;\n}\n.adarender table th {\n  font-weight: 600;\n}\n.adarender table td,\n.adarender table th {\n  /* border: 1px solid #dfe2e5; */\n  padding: 16px 16px;\n  border-bottom: 1px solid #e8e8e8;\n  /* background: #fafafa; */\n}\n.adarender table tr {\n  background-color: #fff;\n  /* border-top: 1px solid #c6cbd1; */\n}\n.adarender table tr:hover td {\n  background-color: #e6f7ff !important;\n}\n.adarender table tr th {\n  /* border: 1px solid #dfe2e5; */\n  /* padding: 16px 16px; */\n  /* border-bottom: 1px solid #e8e8e8; */\n  border-bottom: 1px solid #c6cbd1;\n  background: #f8f8f8;\n}\n.adarender table tr:nth-child(2n) {\n  background-color: #fafafa;\n}\n.adarender p img {\n  display: block;\n  margin: 0 auto;\n  max-width: 80%;\n}\ndiv.center {\n  text-align: center;\n}\n.adarender table {\n  width: 100%;\n  text-align: left;\n}\n.adarender table.centertable {\n  margin: auto;\n  width: auto;\n  display: table;\n}\n.adarender code {\n  margin: 0 1px;\n  padding: 0.2em 0.4em;\n  font-size: 0.9em;\n  background: #f2f4f5;\n  border: 1px solid #eee;\n  border-radius: 3px;\n}\n.adarender pre code {\n  display: inline;\n  max-width: auto;\n  padding: 0;\n  margin: 0;\n  overflow: visible;\n  line-height: inherit;\n  word-wrap: normal;\n  background-color: initial;\n  border: 0;\n}\n/* commodity start */\n.item-wrap {\n  width: 100%;\n  text-align: center;\n}\n.item-wrap .item {\n  display: inline-block;\n  width: 180px;\n  height: 320px;\n  margin-right: 20px;\n}\n.item-wrap .item .pic {\n  width: 180px;\n  height: 180px;\n}\n.item-wrap .item .ctx {\n  display: block;\n  font-size: 12px;\n}\n.item-wrap .item .ctx .title {\n  text-align: left;\n}\n.item-wrap .item .ctx .shop {\n  color: #888;\n  text-align: left;\n}\n.item-wrap .item .ctx .shop > span:nth-child(1) {\n  float: left;\n}\n.item-wrap .item .ctx .shop > span:nth-child(2) {\n  float: right;\n}\n.item-wrap .item .ctx .price {\n  display: block;\n  margin-top: 11px;\n  height: 22px;\n  line-height: 22px;\n  overflow: hidden;\n}\n.item-wrap .item .ctx .price .g-price-highlight {\n  float: left;\n  font-size: 18px;\n  line-height: 22px;\n}\n.item-wrap .item .ctx .price .g-price-highlight > span:nth-child(1) {\n  float: left;\n}\n.H {\n  color: #f40;\n}\n.item-wrap .item .ctx .deal-cnt {\n  float: right;\n  color: #888;\n}\n.item-wrap .item .ctx .posttage {\n  background-color: #f40;\n  color: #fff;\n  font-size: 12px;\n}\n.item-wrap .item .ctx .feature {\n  font-size: 12px;\n}\n.item-wrap .item .ctx .feature .hot {\n  background-color: #f40;\n  color: #fff;\n  margin-left: 3px;\n}\n.item-wrap .item .ctx .feature > span:nth-child(1) {\n  float: left;\n}\n.item-wrap .item .ctx .feature > span:nth-child(2) {\n  float: right;\n}\n.clearfix {\n  zoom: 1;\n}\n.clearfix:after {\n  content: '.';\n  display: block;\n  height: 0;\n  clear: both;\n  visibility: hidden;\n}\n/* commodity end */\n",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(n){var a=[];return a.toString=function(){return this.map(function(e){var t=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var a=function(e){var t=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t);return"/*# ".concat(n," */")}(r),i=r.sources.map(function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")});return[n].concat(i).concat([a]).join("\n")}return[n].join("\n")}(e,n);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t}).join("")},a.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var n=0;n<e.length;n++){var r=[].concat(e[n]);t&&(r[2]?r[2]="".concat(t," and ").concat(r[2]):r[2]=t),a.push(r)}},a}},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r);function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t){var n=t._adarender;if(n&&n.ecele&&n.ecobj)for(var r=0;r<e.length;++r){var a=n.ecele.offsetWidth,i=n.ecele.offsetHeight;n.oldw==a&&n.oldh==i||(n.oldw=a,n.oldh=i,n.ecobj.resize({width:a,height:i}))}}var d=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.oldw=0,this.oldh=0,this.ecobj=void 0,this.ecele=void 0,this.observer=void 0}return function(e,t,n){t&&i(e.prototype,t),n&&i(e,n)}(e,[{key:"setEChartResize",value:function(e,t){var n=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;this.ecobj=e,this.ecele=t,this.oldw=0,this.oldh=0,this.observer=new n(o),this.observer.observe(t,{attributes:!0,attributeFilter:["style"],attributeOldValue:!0})}}]),e}();function l(e,t){var n=a.a.init(e);return n._adarender=new d,n.setOption(t),n.resize({width:e.offsetWidth,height:e.offsetHeight}),n}function s(e,t,n,r){for(var a=[],i=0;i<e[n].length;++i){for(var o={},d=0;d<t.length;++d)o[t[d]]=e[t[d]][i];a.push(o)}r?a.sort(function(e,t){return e[n]>t[n]?-1:e[n]<t[n]?1:0}):a.sort(function(e,t){return e[n]>t[n]?1:e[n]<t[n]?-1:0});for(var l={},s=0;s<t.length;++s)l[t[s]]=[];for(var c=0;c<a.length;++c)for(var u=0;u<t.length;++u)l[t[u]].push(a[c][t[u]]);return l}function c(e,t,n){for(var r=[],a=0;a<e[t].length;++a)r.push({name:e[t][a],value:e[n][a]});return r}function u(e,t,n,r){var a=e;return"sort"==(r=r||"")?a=s(e,[t,n],n,!1):"reverse"==r&&(a=s(e,[t,n],n,!0)),{ds:a,piedata:c(a,t,n)}}function h(e,t,n){var r="";if(t&&0<t.length){for(var a=0;a<t.length;a++)r+="<th>"+t[a]+' <svg class="icon" aria-hidden="true"><use xlink:href="#icon-up"></use></svg></th>';var i="";if(n&&0<n.length)if(1<t.length){for(var o=0;o<n.length;o++)if(Array.isArray(n[o])&&n[o].length>=t.length){i+="<tr>";for(var d=0;d<n[o].length;d++)i+="<td>"+n[o][d]+"</td>";i+="</tr>"}}else for(var l=0;l<n.length;l++)i+="<tr>"+n[l]+"</tr>";e.innerHTML="<thead>"+r+"</thead><tbody>"+i+"</tbody>"}}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w={},p=function(){function x(e,t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,x),this.eleID=e;var a="";if(n&&0<n.length){this.arrHead=[];for(var i=0;i<n.length;i++){var o={data:n[i],sort:0,id:this.buildID("h",i,-1)};a+='<th id="'+o.id+'" onclick="adarender.mapSortTable.'+e+".sort("+i+')">'+o.data+' <svg class="icon" aria-hidden="true" style="fill-opacity: 0.2;"><use xlink:href="#icon-up"></use></svg></th>',this.arrHead.push(o)}var d="";if(r&&0<r.length)if(this.arrRow=[],this.arrData=[],Array.isArray(r[0]))for(var l=0;l<r.length;l++){if(!(Array.isArray(r[l])&&r[l].length>=n.length))return;var s={data:r[l],id:this.buildID("r",-1,l),arr:[]};d+='<tr id="'+s.id+'">';for(var c=0;c<r[l].length;c++){var u={data:r[l][c],id:this.buildID("d",c,l)};d+='<td id="'+u.id+'">'+u.data+"</td>",s.arr.push(u)}d+="</tr>",this.arrRow.push(s),this.arrData.push(s.arr)}else if(1==n.length)for(var h=0;h<r.length;h++){var f={data:[r[h]],id:this.buildID("r",-1,h),arr:[]},p={data:r[h],id:this.buildID("d",0,h)};d+='<tr id="'+this.buildID("r",h,-1)+'"><td id="'+p.id+'">'+p.data+"</td></tr>",f.arr.push(p),this.arrRow.push(f),this.arrData.push(f.arr)}t.innerHTML="<thead>"+a+"</thead><tbody>"+d+"</tbody>";for(var g=0;g<this.arrHead.length;++g)this.arrHead[g].ele=document.getElementById(this.arrHead[g].id);for(var b=0;b<this.arrRow.length;++b)this.arrRow[b].ele=document.getElementById(this.arrRow[b].id);for(var m=0;m<this.arrData.length;++m)for(var v=0;v<this.arrData[m].length;++v)this.arrData[m][v].ele=document.getElementById(this.arrData[m][v].id);if(this.eleTable=t,1!=(this.dsHead=n).length||Array.isArray(r[0]))this.dsData=r;else{this.dsData=[];for(var y=0;y<r.length;++y)this.dsData.push([r[y]])}w[e]=this}}return function(e,t,n){t&&f(e.prototype,t),n&&f(e,n)}(x,[{key:"isValid",value:function(){return!!this.eleTable}},{key:"buildID",value:function(e,t,n){return"h"==e?this.eleID+"_h_"+t:"r"==e?this.eleID+"_r_"+n:this.eleID+"_d_"+n+"_"+t}},{key:"rebuildHead",value:function(e){if(0<=e&&e<this.arrHead.length)for(var t=0;t<this.arrHead.length;++t){var n=-1==this.arrHead[t].sort?"down":"up",r=t==e?"1":"0.2",a=this.arrHead[t].data+' <svg class="icon" aria-hidden="true" style="fill-opacity: '+r+';"><use xlink:href="#icon-'+n+'"></use></svg>';this.arrHead[t].ele.innerHTML=a}}},{key:"rebuild",value:function(){this.arrData=[];for(var e=0;e<this.dsData.length;e++){var t=this.arrRow[e];t.data=this.dsData[e],t.arr=[];for(var n="",r=0;r<this.dsData[e].length;r++){var a={data:this.dsData[e][r],id:this.buildID("d",r,e)};n+='<td id="'+a.id+'">'+a.data+"</td>",t.arr.push(a)}t.ele.innerHTML=n,this.arrData.push(t.arr);for(var i=0;i<this.arrData[e].length;++i)this.arrData[e][i].ele=document.getElementById(this.arrData[e][i].id)}}},{key:"sort",value:function(n){0<=n&&n<this.arrHead.length&&(1!=this.arrHead[n].sort?this.arrHead[n].sort=1:this.arrHead[n].sort=-1,1==this.arrHead[n].sort?this.dsData.sort(function(e,t){return e[n]<t[n]?-1:e[n]>t[n]?1:0}):this.dsData.sort(function(e,t){return e[n]<t[n]?1:e[n]>t[n]?-1:0}),this.rebuildHead(n),this.rebuild())}}]),x}();function g(){return[{itemStyle:{normal:{borderColor:"#555",borderWidth:4,gapWidth:4}}},{colorSaturation:[.3,.6],itemStyle:{normal:{borderColorSaturation:.7,gapWidth:2,borderWidth:2}}},{colorSaturation:[.3,.5],itemStyle:{normal:{borderColorSaturation:.6,gapWidth:1}}},{colorSaturation:[.3,.5]}]}function b(e){e.on("click",function(e){e&&"treemap"==e.componentSubType&&"series"==e.componentType&&"treemap"==e.seriesType&&e.data&&"string"==typeof e.data.url&&""!=e.data.url&&window.open(e.data.url,"_blank")})}n(1);n.d(t,"initChart",function(){return l}),n.d(t,"AdaRender",function(){return d}),n.d(t,"sortDataset",function(){return s}),n.d(t,"setTableData",function(){return h}),n.d(t,"buildPieData",function(){return c}),n.d(t,"buildAllPieData",function(){return u}),n.d(t,"buildTreemapLevels",function(){return g}),n.d(t,"onInitTreemap",function(){return b}),n.d(t,"mapSortTable",function(){return w}),n.d(t,"SortTable",function(){return p})}],a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=5);function a(e){if(i[e])return i[e].exports;var t=i[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}var r,i});