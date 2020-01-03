# Ada Render

### 概要

`adarender`是一个`开箱即用`的`markdown`渲染器，除了对`github`的`markdown`语法支持外，它还有一套自己扩展的图表语法。  
`adarender`可以通过命令行或 grpc 服务 2 种方式来渲染页面。

`adarender`的初衷是提供一套方便的文档输出方案，让用户专注于文档本身，而不需要关注复杂的 css 排版技巧。

`adarender`适合用于文档或报表输出的渲染步骤。

### 安装 & 使用

可以通过 npm 安装，然后命令行方式使用。

```bash
npm i adarender -g
```

然后，通过这样来渲染。

```bash
adarender exportmd -o samples/output001.html -t samples/template.hbs samples/sample001.md
```

例子文件[在这里](https://github.com/zhs007/adarender/blob/master/samples/sample001.md)。
最后生成的页面如下:

![output](https://github.com/zhs007/adarender/blob/master/samples/output.png)

### 作为 markdown-it 的插件使用

```bash
npm i adarender --save
```

因为 `adarender` 是一系列插件，所以不能用常规的 use 来使用，而是用 registerAllPlugins 来完成注册。

```js
'use strict';

const MarkdownIt = require('markdown-it');
const adarender = require('adarender');

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  }
});

adarender.registerAllPlugins(md, {});
```

### 接入hexo

可以直接使用 ``hexo-renderer-adarender`` 。

### 插件开发

adarender插件分为2部分，一部分是node.js这边的模板解析模块，一部分是前端页面js代码。

node.js这边相对简单，我们其实是将yaml通过一个模板(少量代码)，解析成html。  
现在默认的模板引擎是``handlebars``，这个感觉选错了，但其实如果插件需要用自己的模板引擎也是可以的，这部分没有限制。

前端js代码这边，我们现在代码放在browser目录下，最后会webpack打包到dist目录下，建议通过``jsdelivr``的cdn访问。  
前面node.js用到的html里的js代码，最好能放到browser里开发。  
browser目录下代码，可以使用ES6语法。  
所有前端需要用到的资源，包括css和js都应该通过webpack打包发布到dist目录下。  
如果有必要，可以修改``webpack.config.js``文件。

开发完以后，通过npm来build。

```js
npm run build
```

### 更新记录

##### v0.6

- 切换 ``handlebars`` 到 ``ejs``。
- 前端项目结构调整，取消public目录。

##### v0.5

- 结构调整，前端js用webpack打包。
- 各种引用和依赖通过``jsdelivr``加载。
- 增加了非 `fence rule` 的标记处理。
- 新增Hexo插件。

##### v0.3

- 加入Action工作流。
- 代码会自动发布到npm。
- 代码会自动发布到DockerHub。

##### v0.2

- 支持grpc服务。
- 提供Docker部署。
- Golangadacore

##### v0.1

- 搭建基本框架。
- 基本echart插件体系。
- 支持命令行处理。