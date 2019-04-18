/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","knockout","ojs/ojlogger"],function(n,e,t){return(new function(){var n=new WeakMap,r={},i={},o="_ojExtended",c="_ojCacheScope";function s(n){return new Function("$context","$element","with($context.$data||{}){with($context){return "+n+"}}")}function a(e,t,r){if(!r)return e(t,r);var i,o=n,s=r[c]||r;(i=o.get(s))||(i={},o.set(s,i));var a=i[t];return a||(a=e(t,r),i[t]=a),a}function u(n,e,t){var r=e.getBindingsString;if(r)return r.call(e,n,t);switch(n.nodeType){case 1:return n.getAttribute("data-bind");case 8:var i=n.nodeValue.match(/^\s*ko(?:\s+([\s\S]+))?\s*$/);return i?i[1]:null;default:return null}}this.install=function(){var n=e.bindingProvider,c=n.instance;if(!c.getBindingAccessors)return t.error("JET's Knockout bindings are not compatible with the current binding provider since it does not implement getBindingAccessors()"),this;var d={};n.instance=d;var l=[];return l.push("getBindingAccessors","nodeHasBindings","getBindings"),l.forEach(function(n){d[n]=function(n,t,i){var o="nodeHasBindings"===t;return function(c){if(o){var s=c.nodeType;if(1!==s&&8!==s)return!1}var a=i(t,n[t]),u=a?a.apply(n,arguments):null,d=r[t];if(null!=d){var l=arguments;d.forEach(function(t){var r=Array.prototype.slice.call(l);r.push(u,n),u=e.ignoreDependencies(t,null,r)})}return u}}(c,n,function(n,t){return"getBindingAccessors"!==n?t:function(n,t){return function(r,i){if(i[o]){var c=u(r,t,i),d=c?function(n,t){return a(function(n){var t=e.expressionRewriting.preProcessBindings(n,{valueAccessors:!0});return s("{"+t+"}")},n,t)}(c,i)(i,r):null;if(1===r.nodeType&&e.components.isRegistered(r.tagName.toLowerCase())){var l=n.call(t,r,i),f=l.component;f&&((d=d||{}).component=f)}return d}return n.call(t,r,i)}}(t,c)})}),d.preprocessNode=function(n){var t=n.preprocessNode;return function(r){var o,c,s=null;return 1===r.nodeType&&(o=i[r.nodeName.toLowerCase()]),o||(o=t,s=n),o&&(c=e.ignoreDependencies(o,s,[r])),Array.isArray(c)&&(c=function(n,t){for(var r=e.bindingProvider.instance,i=t.slice(0),o=t[0],c=0,s=0;c>=0;){var a=e.virtualElements.nextSibling(o);if(o!==n){var u=r.preprocessNode(o);Array.isArray(u)&&(i.splice.apply(i,[s,1].concat(u)),s+=u.length-1)}s+=1;var d=c+1;c=(o=a)?t.indexOf(o,d):-1,s+=c-d}return i}(r,c)),c}}(c),function(n){var e=n.nativeTemplateEngine.prototype,t="renderTemplateSource",r=e[t];e[t]=function(n,e,t,i){return r.call(this,n,e,t,i||document)}}(e),this},this.addPostprocessor=function(n){Object.keys(n).forEach(function(e){r[e]=r[e]||[],r[e].push(n[e])})},this.registerPreprocessor=function(n,e){i[n]=e},this.getBindingsString=function(n,e,t){return u(n,e,t)},this.extendBindingContext=function(n,e,t,r,i){var s={$current:e,$root:void 0,$parent:void 0,$parents:void 0};return t&&(s[t]=e),r&&(s[r]=e),n?s=n.extend(s):s.$data={},Object.defineProperty(s,c,{value:i}),Object.defineProperty(s,o,{value:!0}),s},this.createBindingExpressionEvaluator=function(n,e){return e[o]?s(n):new Function("$context","with($context){with($data||{}){return "+n+";}}")},this.createEvaluator=function(n,e){return a(this.createBindingExpressionEvaluator,n,e)}}).install()});