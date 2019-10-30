import {sortDataset} from './datasetutils';

/**
 * buildPieData
 * @param {object} dataset - dataset
 * @param {string} namen - dataset[namen][i] is piedata[i].name
 * @param {string} namev - dataset[namev][i] is piedata[i].value
 * @return {object} piedata - piedata, is like [{name, value}]
 */
function buildPieData(dataset, namen, namev) {
  const piedata = [];

  for (let i = 0; i < dataset[namen].length; ++i) {
    piedata.push({
      name: dataset[namen][i],
      value: dataset[namev][i],
    });
  }

  return piedata;
}

/**
 * buildAllPieData
 * @param {object} dataset - dataset
 * @param {string} namen - dataset[namen][i] is piedata[i].name
 * @param {string} namev - dataset[namev][i] is piedata[i].value
 * @param {string} sort - '' | sort | reverse
 * @return {object} ret - {ds, piedata}
 */
function buildAllPieData(dataset, namen, namev, sort) {
  if (!sort) {
    sort = '';
  }

  let ds = dataset;
  if (sort == 'sort') {
    ds = sortDataset(dataset, [namen, namev], namev, false);
  } else if (sort == 'reverse') {
    ds = sortDataset(dataset, [namen, namev], namev, true);
  }

  return {ds: ds, piedata: buildPieData(ds, namen, namev)};
}

export {buildPieData, buildAllPieData};
