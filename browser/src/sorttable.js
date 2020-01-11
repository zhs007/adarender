const mapSortTable = {};

/**
 * SortTable class - sort table
 *  eleID - element ID
 *  eleTable - element for table
 *  arrHead - [{data, sort, id, ele}]
 *  arrRow - [{data, id, ele, arr}]
 *  arrData - [[{data, id, ele}]]
 *  dsHead - dataset head
 *  dsData - dataset data
 */
class SortTable {
  /**
   * constructor
   * @param {string} eleID - element ID
   * @param {object} eleTable - eleTable
   * @param {array} dsHead - dataset head, [...]
   * @param {array} dsData - dataset data, [[...] ...]
   */
  constructor(eleID, eleTable, dsHead, dsData) {
    this.eleID = eleID;

    let strhead = '';
    if (dsHead && dsHead.length > 0) {
      this.arrHead = [];

      for (let i = 0; i < dsHead.length; i++) {
        const ch = {data: dsHead[i], sort: 0, id: this.buildID('h', i, -1)};

        strhead +=
          '<th id="' +
          ch.id +
          '" onclick="adarender.mapSortTable.' +
          eleID +
          '.sort(' +
          i +
          ')">' +
          ch.data +
          ' <svg class="icon" aria-hidden="true" style="fill-opacity: 0.2;">' +
          '<use xlink:href="#icon-up"></use>' +
          '</svg></th>';

        this.arrHead.push(ch);
      }
    } else {
      return;
    }

    let strdata = '';
    if (dsData && dsData.length > 0) {
      this.arrRow = [];
      this.arrData = [];

      // 如果这里dsData不是数组，只可能表格只有1列
      if (Array.isArray(dsData[0])) {
        for (let i = 0; i < dsData.length; i++) {
          if (Array.isArray(dsData[i]) && dsData[i].length >= dsHead.length) {
            const cr = {
              data: dsData[i],
              id: this.buildID('r', -1, i),
              arr: [],
            };

            strdata += '<tr id="' + cr.id + '">';
            for (let j = 0; j < dsData[i].length; j++) {
              const cd = {data: dsData[i][j], id: this.buildID('d', j, i)};

              strdata += '<td id="' + cd.id + '">' + cd.data + '</td>';

              cr.arr.push(cd);
            }
            strdata += '</tr>';

            this.arrRow.push(cr);
            this.arrData.push(cr.arr);
          } else {
            // 不允许有错误行，如果要处理错误行，排序会带来额外的开销，暂时不考虑这个
            return;
          }
        }
      } else if (dsHead.length == 1) {
        for (let i = 0; i < dsData.length; i++) {
          const cr = {
            data: [dsData[i]],
            id: this.buildID('r', -1, i),
            arr: [],
          };
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

          cr.arr.push(cd);

          this.arrRow.push(cr);
          this.arrData.push(cr.arr);
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
    this.dsHead = dsHead;

    if (dsHead.length == 1 && !Array.isArray(dsData[0])) {
      this.dsData = [];

      for (let i = 0; i < dsData.length; ++i) {
        this.dsData.push([dsData[i]]);
      }
    } else {
      this.dsData = dsData;
    }

    mapSortTable[eleID] = this;
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

  /**
   * rebuildHead
   * @param {string} x - x
   */
  rebuildHead(x) {
    if (x >= 0 && x < this.arrHead.length) {
      for (let i = 0; i < this.arrHead.length; ++i) {
        const strsort = this.arrHead[i].sort == -1 ? 'down' : 'up';
        const strfo = i == x ? '1' : '0.2';
        const strth =
          this.arrHead[i].data +
          ' <svg class="icon" aria-hidden="true" style="fill-opacity: ' +
          strfo +
          ';">' +
          '<use xlink:href="#icon-' +
          strsort +
          '"></use></svg>';

        this.arrHead[i].ele.innerHTML = strth;
      }
    }
  }

  /**
   * rebuild
   */
  rebuild() {
    this.arrData = [];
    for (let i = 0; i < this.dsData.length; i++) {
      const cr = this.arrRow[i];

      cr.data = this.dsData[i];
      cr.arr = [];

      let strdata = '';
      for (let j = 0; j < this.dsData[i].length; j++) {
        const cd = {data: this.dsData[i][j], id: this.buildID('d', j, i)};

        strdata += '<td id="' + cd.id + '">' + cd.data + '</td>';

        cr.arr.push(cd);
      }

      cr.ele.innerHTML = strdata;

      this.arrData.push(cr.arr);

      for (let j = 0; j < this.arrData[i].length; ++j) {
        this.arrData[i][j].ele = document.getElementById(this.arrData[i][j].id);
      }
    }
  }

  /**
   * sort
   * @param {string} x - x
   */
  sort(x) {
    if (x >= 0 && x < this.arrHead.length) {
      if (this.arrHead[x].sort != 1) {
        this.arrHead[x].sort = 1;
      } else {
        this.arrHead[x].sort = -1;
      }

      if (this.arrHead[x].sort == 1) {
        this.dsData.sort((a, b) => {
          if (a[x] < b[x]) {
            return -1;
          } else if (a[x] > b[x]) {
            return 1;
          }

          return 0;
        });
      } else {
        this.dsData.sort((a, b) => {
          if (a[x] < b[x]) {
            return 1;
          } else if (a[x] > b[x]) {
            return -1;
          }

          return 0;
        });
      }

      this.rebuildHead(x);
      this.rebuild();
    }
  }
}

export {mapSortTable, SortTable};
