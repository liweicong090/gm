(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"780c":function(e,t,n){"use strict";n.r(t);var r=n("d388"),o=n.n(r);for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=o.a},"79f5":function(e,t,n){},"87ed":function(e,t,n){"use strict";(function(e,t,r){n("3e2c");var o=f(n("66fd")),c=f(n("e30b")),u=f(n("222d")),i=f(n("ca7a"));function f(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}o.default.use(u.default),o.default.config.productionTip=!1,c.default.mpType="app",o.default.prototype.wxlogin=function(){return new Promise((function(t,n){e.getUserProfile({desc:"获取用户基本信息",lang:"zh_CN",success:function(n){e.showLoading({title:"授权登陆中"}),t(n)}})})).then((function(t){return new Promise((function(n,r){e.login({provider:"weixin",success:function(e){n({userInfo:t.userInfo,code:e.code})}})}))})).then((function(e){return new Promise((function(n,r){t.callFunction({name:"gm_wxlogin",data:e,success:function(e){200===e.result.status&&n(e)}})}))})).then((function(t){return new Promise((function(n,r){e.setStorage({key:"gm_user",data:t.result,success:function(){i.default.state.isLogin=!0,e.hideLoading(),n(t.result)}})}))}))},o.default.prototype.$store=i.default;var d=new o.default(s(s({},c.default),{},{store:i.default}));r(d).$mount()}).call(this,n("543d")["default"],n("a9ff")["default"],n("543d")["createApp"])},cdb5:function(e,t,n){"use strict";var r=n("79f5"),o=n.n(r);o.a},d388:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("2f62");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i={onLaunch:function(){var t=this;e.checkSession({success:function(){console.log("已登陆"),t.SET_isLogin(!0)},fail:function(){console.log("未登录"),t.SET_isLogin(!1)}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},methods:c({},(0,r.mapMutations)(["SET_isLogin"]))};t.default=i}).call(this,n("543d")["default"])},e30b:function(e,t,n){"use strict";n.r(t);var r=n("780c");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("cdb5");var c,u,i,f,a=n("f0c5"),s=Object(a["a"])(r["default"],c,u,!1,null,null,null,!1,i,f);t["default"]=s.exports}},[["87ed","common/runtime","common/vendor"]]]);