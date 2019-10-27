/**
 * buildTreemapLevels
 * @return {array} treemaplevels - treemap levels
 */
function buildTreemapLevels() {
  return [
    {
      itemStyle: {
        normal: {
          borderColor: '#555',
          borderWidth: 4,
          gapWidth: 4,
        },
      },
    },
    {
      colorSaturation: [0.3, 0.6],
      itemStyle: {
        normal: {
          borderColorSaturation: 0.7,
          gapWidth: 2,
          borderWidth: 2,
        },
      },
    },
    {
      colorSaturation: [0.3, 0.5],
      itemStyle: {
        normal: {
          borderColorSaturation: 0.6,
          gapWidth: 1,
        },
      },
    },
    {
      colorSaturation: [0.3, 0.5],
    },
  ];
}

/**
 * onInitTreemap
 * @param {object} ecobj - echart object
 */
function onInitTreemap(ecobj) {
  ecobj.on('click', (ele) => {
    if (
      ele &&
      ele.componentSubType == 'treemap' &&
      ele.componentType == 'series' &&
      ele.seriesType == 'treemap'
    ) {
      if (ele.data) {
        if (typeof ele.data.url === 'string' && ele.data.url != '') {
          window.open(ele.data.url, '_blank');
        }
      }
    }
  });
}

export {buildTreemapLevels, onInitTreemap};
