import echarts from 'echarts';
import {AdaRender} from './adarender';

/**
 * initChart
 * @param {object} ele - element
 * @param {object} ops - options
 * @return {object} obj - chart object
 */
function initChart(ele, ops) {
  const cobj = echarts.init(ele);

  cobj._adarender = new AdaRender();

  // cobj._adarender.setEChartResize(cobj, ele);

  cobj.setOption(ops);

  cobj.resize({width: ele.offsetWidth, height: ele.offsetHeight});

  // console.log('w ', ele.offsetWidth);
  // console.log('h ', ele.offsetHeight);

  return cobj;
}

export {initChart};
