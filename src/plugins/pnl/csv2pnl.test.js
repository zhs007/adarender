'use strict';

const {csv2pnl} = require('./csv2pnl');
const {exportMarkdown} = require('../../export/exportmd');
const fs = require('fs');

test('adarender', () => {
  const mdstr = fs.readFileSync('./samples/test001.md', 'utf8').toString();
  const tmpstr = fs.readFileSync('./samples/template.hbs', 'utf8').toString();
  const ret = exportMarkdown(mdstr, tmpstr, './samples', './samples');

  // fs.writeFileSync('./samples/test001.html', ret.html, 'utf8');
  const resultsucess = fs.readFileSync('./samples/test001.html', 'utf8');

  expect(ret.html).toBe(resultsucess);
});

test('csv2pnl', () => {
  const str = csv2pnl(
      './samples/roc.110022.csv',
      'pnl110022',
      'PNL 001',
      'pnl 001',
  );

  // fs.writeFileSync('./samples/pnl.md', str, 'utf8');
  const resultsucess = fs.readFileSync('./samples/pnl.md', 'utf8');

  expect(str).toBe(resultsucess);

  const mdstr = fs.readFileSync('./samples/pnl.md', 'utf8').toString();
  const tmpstr = fs.readFileSync('./samples/template.hbs', 'utf8').toString();
  const ret = exportMarkdown(mdstr, tmpstr, './samples', './samples');

  // fs.writeFileSync('./samples/pnl.html', ret.html, 'utf8');
  const resultsucess1 = fs.readFileSync('./samples/pnl.html', 'utf8');

  expect(ret.html).toBe(resultsucess1);
});
