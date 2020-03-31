'use strict';

const {csv2pnl, csv2pnlex} = require('./csv2pnl');
const {exportMarkdown} = require('../../export/exportmd');
const fs = require('fs');

const isgenfiles = false;
// const isgenfiles = true;

test('csv2pnl', () => {
  const str = csv2pnl(
      './samples/roc.110022.csv',
      'pnl110022',
      'PNL 001',
      'pnl 001',
      'mypnl001',
      1000,
  );

  if (isgenfiles) {
    fs.writeFileSync('./samples/pnl.md', str, 'utf8');
  }

  const resultsucess = fs.readFileSync('./samples/pnl.md', 'utf8');

  expect(str).toBe(resultsucess);

  const mdstr = fs.readFileSync('./samples/pnl.md', 'utf8').toString();
  const tmpstr = fs.readFileSync('./samples/template.hbs', 'utf8').toString();
  const ret = exportMarkdown(mdstr, tmpstr, './samples', './samples');

  if (isgenfiles) {
    fs.writeFileSync('./samples/pnl.html', ret.html, 'utf8');
  }

  const resultsucess1 = fs.readFileSync('./samples/pnl.html', 'utf8');

  expect(ret.html).toBe(resultsucess1);
});

test('csv2pnlex', () => {
  const str = csv2pnlex(
      {
        pnl0: {
          title: 'pnl001',
          // csvfn: './samples/roc.110022.csv',
          // csvfn: './samples/110022.rsi-[40.000:46.000].[61.000:71.000].csv',
          csvfn: './samples/110022.rsi-1[44.000-50.000].0[61.000-65.000].csv',
          markstate: 'none',
        },
        pnl1: {
          title: 'pnl002',
          // csvfn: './samples/roc.110022.csv',
          // csvfn: './samples/110022.rsi-[40.000:46.000].[61.000:71.000].csv',
          csvfn: './samples/110022.rsi-1[18.000-26.000].0[31.000-37.000].csv',
          markstate: 'none',
        },
        pnl2: {
          title: 'pnl003',
          csvfn: './samples/buyandhold.110022.csv',
          markstate: 'none',
        },
      },
      'pnl110022',
      'PNL 001',
      'pnl 001',
      1000,
  );

  if (isgenfiles) {
    fs.writeFileSync('./samples/pnl1.md', str, 'utf8');
  }

  const resultsucess = fs.readFileSync('./samples/pnl1.md', 'utf8');

  expect(str).toBe(resultsucess);

  const mdstr = fs.readFileSync('./samples/pnl1.md', 'utf8').toString();
  const tmpstr = fs.readFileSync('./samples/template.hbs', 'utf8').toString();
  const ret = exportMarkdown(mdstr, tmpstr, './samples', './samples');

  if (isgenfiles) {
    fs.writeFileSync('./samples/pnl1.html', ret.html, 'utf8');
  }

  const resultsucess1 = fs.readFileSync('./samples/pnl1.html', 'utf8');

  expect(ret.html).toBe(resultsucess1);
});
