# Ada Render Blog

## 2019-07-30

``` sh
node ./bin/adarender.js startservice ./cfg/service.yaml
```

## 2019-07-29

目前用``github``的``css``配置，导出``markdown``文件。

例子如下：

``` sh
node ./bin/adarender.js exportmd -o samples/output001.html -t samples/template.hbs samples/sample001.md
```

因为``markdown-it``只生成html文本，所以用``handlebars``模板生成最终的html文件，这个模板文件也是可以配置的。

