const {
  initAccount,
  getAccountInfo,
  getTotalPageList,
} = require('../../src/telegraph/telegraph');

(async () => {
  const ret = await initAccount('cfg/telegraph.yaml');
  console.log(JSON.stringify(ret.telegraph));

  const ai = await getAccountInfo(ret.telegraph);
  console.log(JSON.stringify(ai));

  const pl = await getTotalPageList(ret.telegraph);
  console.log(JSON.stringify(pl));

  process.exit(-1);
})().catch((err) => {
  console.log('catch a err ', err);

  process.exit(-1);
});
