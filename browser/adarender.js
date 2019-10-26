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

  let ow = 0;
  let oh = 0;

  const observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; ++i) {
      const w = ele.offsetWidth;
      const h = ele.offsetHeight;

      if (ow != w || oh != h) {
        ow = w;
        oh = h;

        cobj.resize();
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
