'use strict';

const {csv2assets, csv2assetsex} = require('./csv2assets');
const {exportMarkdown} = require('../../export/exportmd');
const fs = require('fs');

const isgenfiles = false;
// const isgenfiles = true;

test('csv2assets', () => {
  const str = csv2assets(
      './samples/test.sma1.csv',
      'sma1',
      'SMA 001',
      'sma 001',
      'mysma001',
      0.1,
  );

  if (isgenfiles) {
    fs.writeFileSync('./samples/sma1.md', str, 'utf8');
  }

  const resultsucess = fs.readFileSync('./samples/sma1.md', 'utf8');

  expect(str).toBe(resultsucess);

  const mdstr = fs.readFileSync('./samples/sma1.md', 'utf8').toString();
  const tmpstr = fs.readFileSync('./samples/template.hbs', 'utf8').toString();
  const ret = exportMarkdown(mdstr, tmpstr, './samples', './samples');

  if (isgenfiles) {
    fs.writeFileSync('./samples/sma1.html', ret.html, 'utf8');
  }

  const resultsucess1 = fs.readFileSync('./samples/sma1.html', 'utf8');

  expect(ret.html).toBe(resultsucess1);
});

test('csv2assetsex', () => {
  const str = csv2assetsex(
      {
        pnl0: {
          title: 'sma1',
          csvfn: './samples/test.sma1.csv',
          mul: 1,
        },
        pnl1: {
          title: 'ema5',
          csvfn: './samples/test.ema5.csv',
          mul: 1,
        },
        pnl2: {
          title: 'smma10',
          csvfn: './samples/test.smma10.csv',
          mul: 1,
        },
        pnl3: {
          title: 'rsi7',
          csvfn: './samples/test.rsi7.csv',
          mul: 0.01,
        },
      },
      'sma1ema5',
      'sma & ema',
      'sma 1 & ema 5',
      0.1,
  );

  if (isgenfiles) {
    fs.writeFileSync('./samples/ema5.md', str, 'utf8');
  }

  const resultsucess = fs.readFileSync('./samples/ema5.md', 'utf8');

  expect(str).toBe(resultsucess);

  const mdstr = fs.readFileSync('./samples/ema5.md', 'utf8').toString();
  const tmpstr = fs.readFileSync('./samples/template.hbs', 'utf8').toString();
  const ret = exportMarkdown(mdstr, tmpstr, './samples', './samples');

  if (isgenfiles) {
    fs.writeFileSync('./samples/ema5.html', ret.html, 'utf8');
  }

  const resultsucess1 = fs.readFileSync('./samples/ema5.html', 'utf8');

  expect(ret.html).toBe(resultsucess1);
});
