'use strict';

const {loadCSV} = require('./csv');

test('loadcsv', () => {
  const objs = loadCSV('./samples/roc.110022.csv', (arrHead, arrData) => {
    return {
      ts: parseInt(arrData[0]),
      invest: parseFloat(arrData[1]),
      money: parseFloat(arrData[2]),
      buy: parseFloat(arrData[3]),
      sell: parseFloat(arrData[4]),
    };
  });

  expect(objs.length).toBe(2280);

  expect(objs[0].ts).toBe(1282262400);
  expect(objs[0].invest).toBe(10000);
  expect(objs[0].money).toBe(10000);
  expect(objs[0].buy).toBe(0);
  expect(objs[0].sell).toBe(0);

  expect(objs[2279].ts).toBe(1581465600);
  expect(objs[2279].invest).toBe(10000);
  expect(objs[2279].money).toBe(40833.438);
  expect(objs[2279].buy).toBe(0);
  expect(objs[2279].sell).toBe(0);
});
