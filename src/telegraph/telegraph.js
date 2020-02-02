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
 * getPageList - get page list
 * @param {object} telegraph - telegraph
 * @param {int} offset - offset
 * @param {int} limit - limit, [0,200]
 * @return {Promise<object>} ret - {error, pagelist}
 */
async function getPageList(telegraph, offset, limit) {
  return new Promise((resolve, reject) => {
    request
        .post(
            {
              url: 'https://api.telegra.ph/getPageList',
              formData: {
                access_token: telegraph.token,
                offset: offset,
                limit: limit,
              },
              timeout: telegraph.timeout,
            },
            (err, response, body) => {
              if (err) {
                resolve({error: err});

                return;
              }

              if (response.statusCode != 200) {
                resolve({
                  error: new Error(
                      'telegraph.getPageList response ' + response.statusCode,
                  ),
                });

                return;
              }

              try {
                const ret = JSON.parse(body);
                if (!ret) {
                  resolve({
                    error: new Error(
                        'telegraph.getPageList getPageList invalid body. ' + body,
                    ),
                  });

                  return;
                }

                if (!ret.ok) {
                  resolve({
                    error: new Error(
                        'telegraph.getPageList getPageList fail. ' + body,
                    ),
                  });

                  return;
                }

                resolve({pagelist: ret.result});
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
 * getPage - get page
 * @param {object} telegraph - telegraph
 * @param {int} pagepath - path
 * @return {Promise<object>} ret - {error, page}
 */
async function getPage(telegraph, pagepath) {
  return new Promise((resolve, reject) => {
    request
        .get(
            'https://api.telegra.ph/getPage/' +
          encodeURIComponent(pagepath) +
          '?return_content=true',
            {
              timeout: telegraph.timeout,
            },
            (err, response, body) => {
              if (err) {
                resolve({error: err});

                return;
              }

              if (response.statusCode != 200) {
                resolve({
                  error: new Error(
                      'telegraph.getPage response ' + response.statusCode,
                  ),
                });

                return;
              }

              try {
                const ret = JSON.parse(body);
                if (!ret) {
                  resolve({
                    error: new Error(
                        'telegraph.getPage getPage invalid body. ' + body,
                    ),
                  });

                  return;
                }

                if (!ret.ok) {
                  resolve({
                    error: new Error('telegraph.getPage getPage fail. ' + body),
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

/**
 * findPage - get total page list
 * @param {array} pagelist - pagelist
 * @param {object} page - page
 * @return {int} index - index
 */
function findPage(pagelist, page) {
  for (let i = 0; i < pagelist.length; ++i) {
    if (pagelist[i].path == page.path) {
      return i;
    }
  }

  return -1;
}

/**
 * getTotalPageList - get total page list
 * @param {object} telegraph - telegraph
 * @return {Promise<object>} ret - {error, account}
 */
async function getTotalPageList(telegraph) {
  const lst = [];
  while (lst.length < telegraph.account.page_count) {
    const ret = await getPageList(telegraph, lst.length, 200);
    if (ret.error) {
      return ret;
    }

    for (let i = 0; i < ret.pagelist.pages.length; ++i) {
      if (findPage(lst, ret.pagelist.pages[i]) == -1) {
        lst.push(ret.pagelist.pages[i]);
      }
    }
  }

  for (let i = 0; i < lst.length; ++i) {
    const p = await getPage(telegraph, lst[i].path);
    if (p.error) {
      return p;
    }

    fs.writeFileSync(
        path.join(telegraph.outputpath, lst[i].title + '.json'),
        JSON.stringify(p.page),
    );
  }

  return {pagelist: lst};
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

/**
 * editPage - edit a page
 * @param {object} telegraph - telegraph
 * @param {string} pagepath - pagepath
 * @param {string} title - title
 * @param {array} lst - nodes
 * @return {Promise<object>} ret - {error, page}
 */
async function editPage(telegraph, pagepath, title, lst) {
  return new Promise((resolve, reject) => {
    request
        .post(
            {
              url: 'https://api.telegra.ph/editPage',
              formData: {
                access_token: telegraph.token,
                path: pagepath,
                title: title,
                author_name: telegraph.authorname,
                content: JSON.stringify(lst),
              },
              timeout: telegraph.timeout,
            },
            (err, response, body) => {
              if (err) {
                resolve({error: err});

                return;
              }

              if (response.statusCode != 200) {
                resolve({
                  error: new Error(
                      'telegraph.editPage response ' + response.statusCode,
                  ),
                });

                return;
              }

              try {
                const ret = JSON.parse(body);
                if (!ret) {
                  resolve({
                    error: new Error(
                        'telegraph.editPage editPage invalid body. ' + body,
                    ),
                  });

                  return;
                }

                if (!ret.ok) {
                  resolve({
                    error: new Error('telegraph.editPage editPage fail. ' + body),
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

/**
 * publishPage - publish a page
 * @param {object} telegraph - telegraph
 * @param {string} title - title
 * @param {array} lst - nodes
 * @return {Promise<object>} ret - {error, page}
 */
async function publishPage(telegraph, title, lst) {
  if (fs.existsSync(path.join(telegraph.outputpath, title + '.json'))) {
    const pagebuf = fs.readFileSync(
        path.join(telegraph.outputpath, title + '.json'),
    );

    const page = JSON.parse(pagebuf);

    return await editPage(telegraph, page.path, title, lst);
  }

  return await newPage(telegraph, title, lst);
}

exports.initAccount = initAccount;
exports.getAccountInfo = getAccountInfo;
exports.newPage = newPage;
exports.editPage = editPage;
exports.getTotalPageList = getTotalPageList;
exports.publishPage = publishPage;
