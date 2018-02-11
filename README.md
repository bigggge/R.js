# R.js

### Hash

http://www.ruanyifeng.com/blog/2011/03/url_hash.html

- HTTP请求不包括#
- 改变#不触发网页重载
- 改变#会改变浏览器的访问历史
- window.location.hash读取#值
- onhashchange事件

虽然 hash 解决了 SPA 路由控制的问题，但是它又引入了新的问题 → url 上会有一个 # 号，很不美观

### History API

https://developer.mozilla.org/zh-CN/docs/Web/API/History

url 的改变只能由以下 3 种途径引起：

- 点击浏览器的前进或者后退按钮；
- 点击 a 标签；
- 在 JS 代码中直接修改路由

> 第 2 和第 3 种途径可以看成是一种，因为 a 标签的默认事件可以被禁止，进而调用 JS 方法

调用history.pushState()或history.replaceState()不会触发popstate事件。
只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()）

### React Router

[Router.js](./react-router-v4/src/Router.js)