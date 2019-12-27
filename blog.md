# Ada Render Blog

### 2019-12-27

因为 Hexo 对于 highlight 的处理放在底层了，所以对于 Markdown-it 来说，如果不关掉 Hexo 的 highlight 就处理不了 fence rule。  
所以需要在 fence rule 以外，还有一套别的标识。

这个版本增加了非 `fence rule` 的标记处理。

```
$$ada.bar$$
id: bar002
datasetname: testdata
title: Bar
width: 1280
height: 800
subtext: this is a test bar
legenddata: ["val1"]
xtype: category
xshowall: true
xdata: namedata
ytype: value
ydata:
  - name: val1
    data: valdata
$$ada.bar$$
```

### 2019-10-26

这几天把 Hexo 的插件完成了，hexo-renderer-adarender。  
优化的过程中，发现一些 js 代码最好能整合一下。

发现一个可以直接 npm 就可以 cdn 的服务，jsdelivr。

```
https://cdn.jsdelivr.net/npm/adarender@0.3.3/index.js
```

上面这样就可以直接 js 文件走 cdn 了，这样前端 js 用起来就省事了。

然后就是 echart，大小需要在启动的时候显示指定，如果 div 里通过宽度决定高度的方案，那么只能想办法后面改变宽高。

### 2019-08-12

增加了图表插件。

这一组图表插件的做法比较简单，依然处理代码段，但语言识别是 ada.pie 或 ada.line 这样的。  
用 yaml 格式，简单而且可读性强。  
后面的 render，也是直接用 handlebars，如果有需要，修改模板即可，整体实现相当简洁。

### 2019-08-09

考虑了引用文件，所以参数有些调整。

```sh
node ./bin/adarender.js exportmd -o samples/output001.html -t samples/template.hbs -p ./samples -i ./samples sample001.md
```

今天还增加了 markdown-it 的一个小插件，大概明白 markdown-it 的插件怎么写了，今天只处理了 render 的部分。  
其实结构上挺简单的，应该还有别的 parse 规则重载方法，后面遇到再说吧。

还加了一个 nodejs 处理图片的库，暂时没用到。

调整了 hex 编码到 base64，这样字符占用小点，但如果用于文件名编码的话，需要把 / 换成 \_，把 = 去掉，同理，解码的时候也要换回来，然后根据字符长度补=（目前貌似没有解码需求）。

```sh
npm publish https://github.com/zhs007/adarender/archive/v0.2.1.tar.gz
```

### 2019-07-30

```sh
node ./bin/adarender.js startservice ./cfg/service.yaml
```

### 2019-07-29

目前用`github`的`css`配置，导出`markdown`文件。

例子如下：

```sh
node ./bin/adarender.js exportmd -o samples/output001.html -t samples/template.hbs samples/sample001.md
```

因为`markdown-it`只生成 html 文本，所以用`handlebars`模板生成最终的 html 文件，这个模板文件也是可以配置的。
