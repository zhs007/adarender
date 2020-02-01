const {initAccount} = require('../../src/telegraph/telegraph');

(async () => {
  const ret = await initAccount('cfg/telegraph.yaml');
  console.log(ret.token);

  process.exit(-1);
})().catch((err) => {
  log.console('catch a err ', err);

  process.exit(-1);
});
