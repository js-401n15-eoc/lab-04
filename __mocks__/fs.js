'use strict';

module.exports = exports = {};

var fileContents = '{"12345":{"id":"12345","category_id":"5555","price":444,"weight":0.5,"quantity_in_stock":10},"54321":{"id":"54321","category_id":"777","price":555,"quantity_in_stock":4}}';

exports.readFile = (file, cb) => {
  if (file.match(/bad/i)) {
    cb('Invalid File');
  }
  else {
    cb(undefined, Buffer.from(fileContents));
  }
};

exports.writeFile = (file, buffer, cb) => {
  if (file.match(/bad/i)) {
    cb('Invalid File');
  }
  else {
    fileContents = buffer;
    cb(undefined, buffer);
  }
};