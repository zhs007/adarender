const {
  initAccount,
  getAccountInfo,
  getTotalPageList,
} = require('../../src/telegraph/telegraph');
const {publishImgs} = require('../../src/telegraph/publish');
const path = require('path');
const fs = require('fs');

(async () => {
  const ret = await initAccount('cfg/telegraph.yaml');
  console.log(JSON.stringify(ret.telegraph));

  const ai = await getAccountInfo(ret.telegraph);
  console.log(JSON.stringify(ai));

  const pl = await getTotalPageList(ret.telegraph);
  console.log(JSON.stringify(pl));

  const page = await publishImgs(
      ret.telegraph,
      '金田一R 第十四卷',
      // 'test',
      (i) => {
        const fn = path.join('../jarviscrawlercore/comic/715/14', i + '.jpg');
        if (fs.existsSync(fn)) {
          return fn;
        }

        return;
      },
      1,
      999,
  );

  console.log(JSON.stringify(page));

  process.exit(-1);
})().catch((err) => {
  console.log('catch a err ', err);

  process.exit(-1);
});
