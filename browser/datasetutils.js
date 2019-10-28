/**
 * sortDataset - Return a sorted dataset
 *  返回一个排序以后的dataset，只包含lstname里的字段，且用sortname进行排序
 *  如果reverse为true，表示从大到小排序，否则从小到大排序
 * @param {object} dataset - dataset
 * @param {array} lstname - This is an array of name, sortname must be in lstname
 * @param {string} sortname - dataset[sortname][i]
 * @param {boolean} reverse - Whether to sort from big to small
 * @return {object} ds - a new dataset, ds[lstname]
 */
function sortDataset(dataset, lstname, sortname, reverse) {
  const ds = [];

  for (let i = 0; i < dataset[sortname].length; ++i) {
    const co = {};
    for (let j = 0; j < lstname.length; ++j) {
      co[lstname[j]] = dataset[lstname[j]][i];
    }
    ds.push(co);
  }

  if (reverse) {
    ds.sort((a, b) => {
      if (a[sortname] > b[sortname]) {
        return -1;
      } else if (a[sortname] < b[sortname]) {
        return 1;
      }

      return 0;
    });
  } else {
    ds.sort((a, b) => {
      if (a[sortname] > b[sortname]) {
        return 1;
      } else if (a[sortname] < b[sortname]) {
        return -1;
      }

      return 0;
    });
  }

  const dsret = {};

  for (let j = 0; j < lstname.length; ++j) {
    dsret[lstname[j]] = [];
  }

  for (let i = 0; i < ds.length; ++i) {
    for (let j = 0; j < lstname.length; ++j) {
      dsret[lstname[j]].push(ds[i][lstname[j]]);
    }
  }

  return dsret;
}

export {sortDataset};
