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

export {buildPieData};
