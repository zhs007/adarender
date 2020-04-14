/**
 * buildPNL - build pnl data
 * @param {array} objs - objs
 * @return {object} ds - {lstx, lsty}
 */
function buildPNL(objs) {
  const ds = {lstx: [], lsty: []};

  for (let i = 0; i < objs.length; ++i) {
    const cd = new Date(objs[i].ts * 1000);
    ds.lstx.push([cd.getFullYear(), cd.getMonth() + 1, cd.getDate()].join('/'));
    ds.lsty.push(objs[i].money);
  }

  return ds;
}

/**
 * buildPNLXDataDay - build pnl x data
 * @param {array} lstts - [timestamp, ...]
 * @return {array} days - ['2000/1/1', ...]
 */
function buildPNLXDataDay(lstts) {
  const lst = [];

  for (let i = 0; i < lstts.length; ++i) {
    const cd = new Date(lstts[i] * 1000);
    lst.push([cd.getFullYear(), cd.getMonth() + 1, cd.getDate()].join('/'));
  }

  return lst;
}

export {buildPNL, buildPNLXDataDay};
