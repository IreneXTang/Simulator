define(["./impl/logger"],function(a){"use strict";function b(a){return a.headers.has("x-oracle-jscpt-cache-expiration-date")}function c(a){return a.headers.has("x-oracle-jscpt-etag-generated")}function d(a){var b=a.get("Content-Type");return!(!b||!b.match(/.*text\/.*/)&&!b.match(/.*application\/.*json.*/))}function e(a){var b=a.get("Content-Type");return b&&-1!==b.indexOf("multipart/")}function f(b,c){a.log("Offline Persistence Toolkit persistenceUtils: requestToJSON()"),c&&c._noClone||(b=b.clone());var d={};return g(b,d,["body","headers","signal"]),d.headers=i(b.headers),k(b,d)}function g(a,b,c){for(var d in a)"function"==typeof a[d]||h(d)||-1!==c.indexOf(d)||(b[d]=a[d])}function h(a){return 0===a.indexOf("_")}function i(a){var b={};if(a.entries){var c,d,e,f=a.entries();do{c=f.next(),c.value&&(d=c.value[0],e=c.value[1],b[d]=e)}while(!c.done)}else a.forEach&&a.forEach(function(a,c){b[c]=a});return j(b),b}function j(b){var c=b.date;c||(a.log("Offline Persistence Toolkit persistenceUtils: Setting HTTP date header since it's null or not exposed"),c=(new Date).toUTCString(),b.date=c)}function k(a,b){return b.body={},a instanceof Request&&e(a.headers)?l(a,b):a instanceof Request||d(a.headers)?a.text().then(function(a){return b.body.text=a,b}):a instanceof Request||"function"!=typeof a.arrayBuffer?Promise.reject(new Error({message:"payload body type is not supported"})):a.arrayBuffer().then(function(a){return a.byteLength>0&&(b.body.arrayBuffer=a),b})}function l(b,c){if(a.log("Offline Persistence Toolkit persistenceUtils: Copying multipart payload"),"function"==typeof b.formData)return b.formData().then(function(a){var b,d,e,f,g={},h=a.entries();do{b=h.next(),(d=b.value)&&(e=d[0],f=d[1],g[e]=f)}while(!b.done);return c.body.formData=g,c});var d=b.headers.get("Content-Type");return b.text().then(function(a){for(var b=u(a,d),e={},f=0;f<b.length;f++)e[b[f].headers.name]=b[f].data;return c.body.formData=e,c})}function m(b,c){a.log("Offline Persistence Toolkit persistenceUtils: responseToJSON()"),c&&c._noClone||(b=b.clone());var d={};return g(b,d,["body","headers"]),d.headers=i(b.headers),c&&c.excludeBody?Promise.resolve(d):k(b,d)}function n(b){a.log("Offline Persistence Toolkit persistenceUtils: requestFromJSON()");var c={};g(b,c,["headers","body","signal"]);var d=o(b,c);return c.headers=p(b,d),q(b,c)}function o(a,b){var c=!1,d=a.body;if(d.text&&d.text.length>0)b.body=d.text;else if(d.arrayBuffer)b.body=d.arrayBuffer;else if(d.formData){c=!0;var e=new FormData,f=d.formData;Object.keys(f).forEach(function(a){e.append(a,f[a])}),b.body=e}return c}function p(a,b){var c=new Headers;return Object.keys(a.headers).forEach(function(d){("content-type"!==d||!b&&"content-type"===d)&&c.append(d,a.headers[d])}),c}function q(a,b){return Promise.resolve(new Request(a.url,b))}function r(b){a.log("Offline Persistence Toolkit persistenceUtils: responseFromJSON()");var c={};return g(b,c,["headers","body"]),c.headers=p(b,!1),s(b,c)}function s(a,b){var c,d=a.body;return d&&d.text?c=new Response(d.text,b):d&&d.arrayBuffer?(b.responseType="blob",c=new Response(d.arrayBuffer,b)):d&&d.blob?(b.responseType="blob",c=new Response(d.blob,b)):c=new Response(null,b),Promise.resolve(c)}function t(b,c){return a.log("Offline Persistence Toolkit persistenceUtils: setResponsePayload()"),m(b).then(function(a){var b=a.body;return b.arrayBuffer=null,b.blob=null,b.text=null,c instanceof ArrayBuffer?b.arrayBuffer=c:c instanceof Blob?b.blob=c:b.text=JSON.stringify(c),r(a)})}function u(b,c){a.log("Offline Persistence Toolkit persistenceUtils: parseMultipartFormData()");var d=c.match(/boundary=(?:"([^"]+)"|([^;]+))/i);if(!d)throw new Error("not a valid multipart form data value.");var e,f=function(a,b){var c=null;try{c=atob(a)}catch(a){return null}for(var d=new ArrayBuffer(c.length),e=new Uint8Array(d),f=0;f<c.length;f++)e[f]=c.charCodeAt(f);return new Blob([d],{type:b})},g=d[1]||d[2],h="string"==typeof b;if(h)e=b;else{var i=new Uint8Array(b);e=String.fromCharCode.apply(null,i)}for(var j=e.split(new RegExp(g)),k=[],l=1;l<j.length-1;l++){var m={},n=j[l],o=n.split("\r\n\r\n"),p=o[0],q=o[1],r=function(a){for(var b={},c={},d=a.split("\r\n"),e=0;e<d.length;e++){var f=d[e];if(0!==f.length){var g=f.split(";");if(1===g.length&&0===g[0].indexOf("Content-Type"))b.contentType=g[0].split(":")[1].trim();else for(var h=0;h<g.length;h++)if(-1!==g[h].indexOf("=")){var i=g[h].split("=");c[i[0].trim()]=i[1].substring(1,i[1].length-1)}}}return b.headers=c,b}(p);m.headers=r.headers,m.data=function(a,b){var c=a.split("\r\n");return b&&b.indexOf("image")>=0?f(c[0],b):c[0]}(q,r.contentType),k.push(m)}return k}function v(b){a.log("Offline Persistence Toolkit persistenceUtils: buildEndpointKey() for Request with url: "+b.url);var c={url:b.url,id:Math.random().toString(36).replace(/[^a-z]+/g,"")};return JSON.stringify(c)}function w(a){return f(a,{_noClone:!0}).then(function(a){return n(a).then(function(a){return a})})}function x(a,b){return b=b||{},m(a,{_noClone:!0}).then(function(a){return r(a).then(function(a){return null!=b.url&&b.url.length>0&&null==a.headers.get("x-oracle-jscpt-response-url")&&a.headers.set("x-oracle-jscpt-response-url",b.url),a})})}return{requestToJSON:f,requestFromJSON:n,responseToJSON:m,responseFromJSON:r,setResponsePayload:t,parseMultipartFormData:u,isCachedResponse:b,isGeneratedEtagResponse:c,_isTextPayload:d,buildEndpointKey:v,_cloneRequest:w,_cloneResponse:x}});