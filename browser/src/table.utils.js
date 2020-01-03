/**
 * setTableData -
 * @param {object} eleTable - table
 * @param {array} dsHead - dataset head
 * @param {array} dsData - dataset data
 * @return {error} err - error
 */
function setTableData(eleTable, dsHead, dsData) {
  let strhead = '';
  if (dsHead && dsHead.length > 0) {
    for (let i = 0; i < dsHead.length; i++) {
      strhead += '<th>' + dsHead[i] + '</th>';
    }
  } else {
    return undefined;
  }

  let strdata = '';
  if (dsData && dsData.length > 0) {
    if (dsHead.length > 1) {
      for (let i = 0; i < dsData.length; i++) {
        if (Array.isArray(dsData[i]) && dsData[i].length >= dsHead.length) {
          strdata += '<tr>';
          for (let j = 0; j < dsData[i].length; j++) {
            strdata += '<td>' + dsData[i][j] + '</td>';
          }
          strdata += '</tr>';
        }
      }
    } else {
      for (let i = 0; i < dsData.length; i++) {
        strdata += '<tr>' + dsData[i] + '</tr>';
      }
    }
  }

  eleTable.innerHTML =
    '<thead>' + strhead + '</thead>' + '<tbody>' + strdata + '</tbody>';

  return undefined;
}

export {setTableData};
