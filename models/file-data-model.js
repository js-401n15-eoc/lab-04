'use strict';

const uuid = require('uuid/v4');
const mockFs = require('../__mocks__/fs.js');
const fs = require('fs');
const Validator = require('../lib/validator.js');
const filePath = `${__dirname}/data/products.json`;
const validator = new Validator();
const Products = require('../models/products.js');

class Model {

  constructor() {
    this.database = [];
  }

  async get(id) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
        if (err) {
            reject(err);
        }
        this.database = JSON.parse(data);
        let response = id ? this.database.filter((record) => record.id === id) : this.database;
        resolve(response);
        });
    });
  }

  create(record, objType) {
    record.id = uuid();
    return new Promise((resolve, reject) => {
      if (!validator.isValid(record, objType)) { reject('Invalid Object'); }
      const jsonString = JSON.stringify(record);
      fs.writeFile(filePath, jsonString, (err, data) => {
        if (err) { reject(err); }
        else {
            data = record;
            resolve(data);
        }
      });
    })
  }

  update(id, record) {
    this.database = this.database.map((item) => (item.id === id) ? record : item);
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

}

module.exports = Model;