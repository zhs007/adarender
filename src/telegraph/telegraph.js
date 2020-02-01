'use strict';

const {loadConfig} = require('./config');
const {isError} = require('../utils');
const request = require('request');
// const Telegraph = require('telegraph-node');
// const ph = new Telegraph();

/**
 * initAccount - init a account, https://api.telegra.ph/createAccount?short_name=Sandbox&author_name=Anonymous
 * @param {string} cfgfn - cfgfile
 * @return {Promise<object>} ret - {error, token}
 */
async function initAccount(cfgfn) {
  return new Promise((resolve, reject) => {
    const cfg = loadConfig(cfgfn);
    if (isError(cfg)) {
      resolve({error: cfg});

      return;
    }

    if (cfg.token) {
      resolve({token: cfg.token});

      return;
    }

    const requrl =
      'https://api.telegra.ph/createAccount?short_name=' +
      encodeURIComponent(cfg.shortname) +
      '&author_name=' +
      encodeURIComponent(cfg.authorname);

    request
        .get(
            requrl,
            {
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

                resolve({token: ret.result.access_token});
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
