const request = require('request');
const fs = require('fs');

/**
 * parsefn - parse filename
 * @param {string} fn - filename
 * @return {object} ret - {uploadfn, type}
 */
function parsefn(fn) {
  const nfn = fn.toLowerCase();
  const arr = nfn.split('/');
  const ufn = arr[arr.length - 1];
  const arr1 = ufn.split('.');
  if (arr1[arr1.length - 1] == 'jpg' || arr1[arr1.length - 1] == 'jpeg') {
    return {uploadfn: ufn, type: 'image/jpeg'};
  } else if (arr1[arr1.length - 1] == 'png') {
    return {uploadfn: ufn, type: 'image/png'};
  }

  return undefined;
}

/**
 * upload - upload a file
 * @param {string} fn - filename
 * @param {object} telegraph - telegraph
 * @return {Promise<object>} ret - {error, buf}
 */
function upload(fn, telegraph) {
  return new Promise((resolve, reject) => {
    const fnret = parsefn(fn);
    if (!fnret) {
      resolve({error: new Error('telegraph.upload invalid file type.')});

      return;
    }

    request
        .post(
            {
              url: 'https://telegra.ph/upload',
              formData: {
                custom_file: {
                  value: fs.createReadStream(fn),
                  options: {
                    filename: fnret.uploadfn,
                    contentType: fnret.type,
                  },
                },
              },
            },
            (err, response, body) => {
              if (err) {
                resolve({error: err});

                return;
              }

              try {
                const ret = JSON.parse(body);
                if (!ret) {
                  resolve({
                    error: new Error('telegraph.upload invalid body. ' + body),
                  });

                  return;
                }

                if (!Array.isArray(ret)) {
                  resolve({
                    error: new Error(
                        'telegraph.upload invalid body (not array). ' + body,
                    ),
                  });

                  return;
                }

                resolve({url: ret[0].src});
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

exports.upload = upload;
exports.parsefn = parsefn;
