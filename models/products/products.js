'use strict';

const FileCollection = require('../file-data-model.js');
const Product = require('./product.js');

class Products extends FileCollection {
  constructor() {
    super(Product);
  }
}

module.exports = Products;