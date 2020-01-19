'use strict';

const MemCollection = require('../memory-data-model.js');
const Category = require('./category.js');


class Categories extends MemCollection {
  constructor() {
    super(Category);
  }
}

module.exports = Categories;