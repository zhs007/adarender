/**
 * setTableData -
 * @param {object} eleTable - table
 * @param {array} dsHead - dataset head
 * @param {array} dsData - dataset data
 * @return {error} err - error
 */
function setTableData(eleTable, dsHead, dsData) {
  const strhead = '';
  for (let i = 0; i < dsHead.length; i++) {
    strhead += '<th>' + dsHead[i] + '</th>';
  }

  const strdata = '';

  eleTable.innerHTML =
    '<thead>' + strhead + '</thead>' + '<tbody>' + strdata + '</tbody>';

  return undefined;
}

export {setTableData};
