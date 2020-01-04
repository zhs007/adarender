/**
 * SortTable class - sort table
 *  eleID - element ID
 *  eleTable - element for table
 *  arrHead - [{data, sort, id, ele}]
 *  arrRow - [{data, id, ele}]
 *  arrData - [[{data, id, ele}]]
 */
class SortTable {
  /**
   * constructor
   * @param {string} eleID - element ID
   * @param {object} eleTable - eleTable
   * @param {array} dsHead - dataset head
   * @param {array} dsData - dataset data
   */
  constructor(eleID, eleTable, dsHead, dsData) {
    this.eleID = eleID;

    let strhead = '';
    if (dsHead && dsHead.length > 0) {
      this.arrHead = [];

      for (let i = 0; i < dsHead.length; i++) {
        const ch = {data: dsHead[i], sort: 0, id: this.buildID('h', i, -1)};

        strhead += '<th id="' + ch.id + '">' + ch.data + '</th>';

        this.arrHead.push(ch);
      }
    } else {
      return;
    }

    let strdata = '';
    if (dsData && dsData.length > 0) {
      this.arrRow = [];
      this.arrData = [];

      if (dsHead.length > 1) {
        for (let i = 0; i < dsData.length; i++) {
          if (Array.isArray(dsData[i]) && dsData[i].length >= dsHead.length) {
            const cr = {data: dsData[i], id: this.buildID('r', -1, i)};
            const cdl = [];

            strdata += '<tr id="' + cr.id + '">';
            for (let j = 0; j < dsData[i].length; j++) {
              const cd = {data: dsData[i][j], id: this.buildID('d', j, i)};

              strdata += '<td id="' + cd.id + '">' + cd.data + '</td>';

              cdl.push(cd);
            }
            strdata += '</tr>';

            this.arrRow.push(cr);
            this.arrData.push(cdl);
          }
        }
      } else {
        for (let i = 0; i < dsData.length; i++) {
          const cr = {data: dsData[i], id: this.buildID('r', -1, i)};
          const cd = {data: dsData[i], id: this.buildID('d', 0, i)};

          strdata +=
            '<tr id="' +
            this.buildID('r', i, -1) +
            '">' +
            '<td id="' +
            cd.id +
            '">' +
            cd.data +
            '</td>' +
            '</tr>';

          const cdl = [cd];

          this.arrRow.push(cr);
          this.arrData.push(cdl);
        }
      }
    }

    eleTable.innerHTML =
      '<thead>' + strhead + '</thead>' + '<tbody>' + strdata + '</tbody>';

    for (let i = 0; i < this.arrHead.length; ++i) {
      this.arrHead[i].ele = document.getElementById(this.arrHead[i].id);
    }

    for (let i = 0; i < this.arrRow.length; ++i) {
      this.arrRow[i].ele = document.getElementById(this.arrRow[i].id);
    }

    for (let i = 0; i < this.arrData.length; ++i) {
      for (let j = 0; j < this.arrData[i].length; ++j) {
        this.arrData[i][j].ele = document.getElementById(this.arrData[i][j].id);
      }
    }

    this.eleTable = eleTable;
  }

  /**
   * isValid
   * @return {boolean} isValid - is valid
   */
  isValid() {
    if (this.eleTable) {
      return true;
    }

    return false;
  }

  /**
   * buildID
   * @param {string} type - element type
   * @param {string} x - x
   * @param {string} y - y
   * @return {string} id - element id
   */
  buildID(type, x, y) {
    if (type == 'h') {
      return this.eleID + '_h_' + x;
    } else if (type == 'r') {
      return this.eleID + '_r_' + y;
    }

    return this.eleID + '_d_' + y + '_' + x;
  }
}

export {SortTable};
