const {upload} = require('../../src/telegraph/upload');

upload(__dirname + '/../../samples/c.jpg', 30 * 1000).then((ret) => {
  if (ret.error) {
    console.log('upload error ' + ret.error);
  } else {
    console.log('upload ' + ret.url);
  }
});
