'use strict';

const {loadConfig} = require('./config');
const {isError} = require('../utils');
const request = require('request');
const fs = require('fs');
const path = require('path');
// const Telegraph = require('telegraph-node');
// const ph = new Telegraph();

/**
 * initAccount - init a account, https://api.telegra.ph/createAccount?short_name=Sandbox&author_name=Anonymous
 * @param {string} cfgfn - cfgfile
 * @return {Promise<object>} ret - {error, telegraph}
 */
async function initAccount(cfgfn) {
  return new Promise((resolve, reject) => {
    const cfg = loadConfig(cfgfn);
    if (isError(cfg)) {
      resolve({error: cfg});

      return;
    }

    if (cfg.token) {
      resolve({telegraph: cfg});

      return;
    }

    // const requrl =
    //   'https://api.telegra.ph/createAccount?short_name=' +
    //   encodeURIComponent(cfg.shortname) +
    //   '&author_name=' +
    //   encodeURIComponent(cfg.authorname);

    request
        .post(
            {
              url: 'https://api.telegra.ph/createAccount',
              formData: {short_name: cfg.shortname, author_name: cfg.authorname},
              timeout: cfg.timeout,
            },
            (err, response, body) => {
              // {
              //   "ok": true,
              //   "result": {
              //     "short_name": "Zerro",
              //     "author_name": "Zerro Zhao",
              //     "author_url": "",
              //     "access_token": "b53e1085b837cf57e62fe3b8a1e8134469e602afa5097dd9bd5f3c5a2d3f",
              //     "auth_url": "https://edit.telegra.ph/auth/JxkMgVqSEWSNZPUVwcYvg1ctTyW7Q7zzESjTNHLpDD"
              //   }
              // }

              if (err) {
                resolve({error: err});

                return;
              }

              if (response.statusCode != 200) {
                resolve({
                  error: new Error(
                      'telegraph.initAccount response ' + response.statusCode,
                  ),
                });

                return;
              }

              try {
                const ret = JSON.parse(body);
                if (!ret) {
                  resolve({
                    error: new Error(
                        'telegraph.initAccount createAccount invalid body. ' + body,
                    ),
                  });

                  return;
                }

                if (!ret.ok) {
                  resolve({
                    error: new Error(
                        'telegraph.initAccount createAccount fail. ' + body,
                    ),
                  });

                  return;
                }

                cfg.token = ret.result.access_token;
                resolve({telegraph: cfg});
              } catch (err) {
                resolve({error: err});
              }
            },
        )
        .on('error', (err1) => {
          resolve({error: err1});

          return;
        });
  });
}

/**
 * getAccountInfo - get account info
 * @param {object} telegraph - telegraph
 * @return {Promise<object>} ret - {error, account}
 */
async function getAccountInfo(telegraph) {
  return new Promise((resolve, reject) => {
    // const requrl =
    //   'https://api.telegra.ph/getAccountInfo?access_token=' +
    //   telegraph.token +
    //   '&fields=["short_name","author_name","author_url","auth_url","page_count"]';

    request
        .post(
            {
              url: 'https://api.telegra.ph/getAccountInfo',
              formData: {
                access_token: telegraph.token,
                fields: JSON.stringify([
                  'short_name',
                  'author_name',
                  'author_url',
                  'auth_url',
                  'page_count',
                ]),
              },
              timeout: telegraph.timeout,
            },
            (err, response, body) => {
              // {
              //   "ok": true,
              //   "result": {
              //     "short_name": "Zerro",
              //     "author_name": "Zerro Zhao",
              //     "author_url": "",
              //     "auth_url": "https://edit.telegra.ph/auth/gy0CcOwkRBd6VZwMxWpIlfEmWL3NM9a3H8FRW9bOLo",
              //     "page_count": 0
              //   }
              // }

              if (err) {
                resolve({error: err});

                return;
              }

              if (response.statusCode != 200) {
                resolve({
                  error: new Error(
                      'telegraph.getAccountInfo response ' + response.statusCode,
                  ),
                });

                return;
              }

              try {
                const ret = JSON.parse(body);
                if (!ret) {
                  resolve({
                    error: new Error(
                        'telegraph.getAccountInfo getAccountInfo invalid body. ' +
                    body,
                    ),
                  });

                  return;
                }

                if (!ret.ok) {
                  resolve({
                    error: new Error(
                        'telegraph.getAccountInfo getAccountInfo fail. ' + body,
                    ),
                  });

                  return;
                }

                telegraph.account = ret.result;

                fs.writeFileSync(
                    path.join(telegraph.outputpath, 'account.json'),
                    JSON.stringify(telegraph.account),
                );

                resolve({account: telegraph.account});
              } catch (err) {
                resolve({error: err});
              }
            },
        )
        .on('error', (err1) => {
          resolve({error: err1});

          return;
        });
  });
}

/**
 * newPage - new a page
 * @param {object} telegraph - telegraph
 * @param {string} title - title
 * @param {array} lst - nodes
 * @return {Promise<object>} ret - {error, page}
 */
async function newPage(telegraph, title, lst) {
  return new Promise((resolve, reject) => {
    // const requrl =
    //   'https://api.telegra.ph/createPage?access_token=' +
    //   telegraph.token +
    //   '&title=' +
    //   encodeURIComponent(title) +
    //   '&author_name=' +
    //   encodeURIComponent(telegraph.authorname) +
    //   '&content=' +
    //   JSON.stringify(lst);

    request
        .post(
            {
              url: 'https://api.telegra.ph/createPage',
              formData: {
                access_token: telegraph.token,
                title: title,
                author_name: telegraph.authorname,
                content: JSON.stringify(lst),
              },
              timeout: telegraph.timeout,
            },
            (err, response, body) => {
              // {
              //   "ok": true,
              //   "result": {
              //     "short_name": "Zerro",
              //     "author_name": "Zerro Zhao",
              //     "author_url": "",
              //     "auth_url": "https://edit.telegra.ph/auth/gy0CcOwkRBd6VZwMxWpIlfEmWL3NM9a3H8FRW9bOLo",
              //     "page_count": 0
              //   }
              // }

              if (err) {
                resolve({error: err});

                return;
              }

              if (response.statusCode != 200) {
                resolve({
                  error: new Error(
                      'telegraph.newPage response ' + response.statusCode,
                  ),
                });

                return;
              }

              try {
                const ret = JSON.parse(body);
                if (!ret) {
                  resolve({
                    error: new Error(
                        'telegraph.newPage createPage invalid body. ' + body,
                    ),
                  });

                  return;
                }

                if (!ret.ok) {
                  resolve({
                    error: new Error('telegraph.newPage createPage fail. ' + body),
                  });

                  return;
                }

                resolve({page: ret.result});
              } catch (err) {
                resolve({error: err});
              }
            },
        )
        .on('error', (err1) => {
          resolve({error: err1});

          return;
        });
  });
}

exports.initAccount = initAccount;
exports.getAccountInfo = getAccountInfo;
exports.newPage = newPage;
