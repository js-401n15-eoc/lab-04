'use strict';

const Validator = require('../lib/validator.js');
const validator = new Validator();

class MemCollection {

  constructor(DataModel) {
    this.DataModel = DataModel;
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(newData) {
    let record = new this.DataModel(newData);
    if (!validator.isValid(record, record.schema)) { return Promise.reject('Invalid object'); }
    this.database.push(record);
    return Promise.resolve(record);
  }

  update(id, newData) {
    let record = new this.DataModel(newData);
    if (!validator.isValid(record, record.schema)) { return Promise.reject('Invalid object'); }
    this.database = this.database.map((item) => (item.id === id) ? record : item);
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

}

module.exports = MemCollection;