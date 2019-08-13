# Ada Render Blog

### 2019-08-12

增加了图表插件。

这一组图表插件的做法比较简单，依然处理代码段，但语言识别是ada.pie或ada.line这样的。  
用yaml格式，简单而且可读性强。  
后面的render，也是直接用handlebars，如果有需要，修改模板即可，整体实现相当简洁。

### 2019-08-09

考虑了引用文件，所以参数有些调整。

``` sh
node ./bin/adarender.js exportmd -o samples/output001.html -t samples/template.hbs -p ./samples -i ./samples sample001.md
```

今天还增加了 markdown-it 的一个小插件，大概明白 markdown-it 的插件怎么写了，今天只处理了 render 的部分。  
其实结构上挺简单的，应该还有别的 parse 规则重载方法，后面遇到再说吧。

还加了一个 nodejs 处理图片的库，暂时没用到。

调整了hex编码到base64，这样字符占用小点，但如果用于文件名编码的话，需要把 / 换成 _，把 = 去掉，同理，解码的时候也要换回来，然后根据字符长度补=（目前貌似没有解码需求）。

``` sh
npm publish https://github.com/zhs007/adarender/archive/v0.2.1.tar.gz
```

### 2019-07-30

``` sh
node ./bin/adarender.js startservice ./cfg/service.yaml
```

### 2019-07-29

目前用``github``的``css``配置，导出``markdown``文件。

例子如下：

``` sh
node ./bin/adarender.js exportmd -o samples/output001.html -t samples/template.hbs samples/sample001.md
```

因为``markdown-it``只生成html文本，所以用``handlebars``模板生成最终的html文件，这个模板文件也是可以配置的。

