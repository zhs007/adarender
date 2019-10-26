import echarts from 'echarts';

/**
 * initChart
 * @param {object} ele - element
 * @param {object} ops - options
 * @return {object} obj - chart object
 */
function initChart(ele, ops) {
  const cobj = echarts.init(ele);

  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  cobj._adarender_ow = 0;
  cobj._adarender_oh = 0;

  const observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; ++i) {
      const w = ele.offsetWidth;
      const h = ele.offsetHeight;

      if (cobj._adarender_ow != w || cobj._adarender_oh != h) {
        cobj._adarender_ow = w;
        cobj._adarender_oh = h;

        cobj.resize({width: w, height: h});
      }
    }
  });

  observer.observe(ele, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
  });

  cobj.setOption(ops);

  return cobj;
}

export {initChart};
