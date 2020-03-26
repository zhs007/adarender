'use strict';

const {exportMarkdown} = require('./exportmd');
const fs = require('fs');

test('adarender', () => {
  const mdstr = fs.readFileSync('./samples/test001.md', 'utf8').toString();
  const tmpstr = fs.readFileSync('./samples/template.hbs', 'utf8').toString();
  const ret = exportMarkdown(mdstr, tmpstr, './samples', './samples');

  // fs.writeFileSync('./samples/test001.html', ret.html, 'utf8');
  const resultsucess = fs.readFileSync('./samples/test001.html', 'utf8');

  expect(ret.html).toBe(resultsucess);
});
