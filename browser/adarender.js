/**
 * onMutationObserver
 * @param {array} mutations - mutation list
 * @param {object} observer - observer
 */
function onMutationObserver(mutations, observer) {
  const ar = observer._adarender;
  if (ar && ar.ecele && ar.ecobj) {
    for (let i = 0; i < mutations.length; ++i) {
      const w = ar.ecele.offsetWidth;
      const h = ar.ecele.offsetHeight;

      if (ar.oldw != w || ar.oldh != h) {
        ar.oldw = w;
        ar.oldh = h;

        ar.ecobj.resize({width: w, height: h});

        // observer.disconnect();
      }
    }
  }
}

/**
 * AdaRender class
 */
class AdaRender {
  /**
   * constructor
   */
  constructor() {
    this.oldw = 0;
    this.oldh = 0;
    this.ecobj = undefined;
    this.ecele = undefined;
    this.observer = undefined;
  }

  /**
   * setEChartResize - echart初始化时，如果height是动态赋值的，可能就是0，
   *  这时echart会显示不出来，所以有这个接口。
   *  如果当第一次echartinstance.resize 传入一个正常值，后面echartinstance就会自己resize了。
   *
   * @param {object} ecobj - echart object
   * @param {object} ele - element object
   */
  setEChartResize(ecobj, ele) {
    const MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;

    this.ecobj = ecobj;
    this.ecele = ele;
    this.oldw = 0;
    this.oldh = 0;

    this.observer = new MutationObserver(onMutationObserver);

    this.observer._adarender = this;

    this.observer.observe(ele, {
      attributes: true,
      attributeFilter: ['style'],
      attributeOldValue: true,
    });
  }
}

export {AdaRender};
