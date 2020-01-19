'use strict';

const uuid = require('uuid/v4');
const mockFs = require('../__mocks__/fs.js');
const fs = require('fs');
const Validator = require('../lib/validator.js');
const filePath = `${__dirname}/data/products.json`;
const validator = new Validator();

class FileCollection {

  constructor(DataModel) {
    this.DataModel = DataModel;
  }

  get(id) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
        if (err) {
            reject(err);
        }

        const dbObj = JSON.parse(data);
        let response = id ? dbObj.database.filter((record) => record.id === id) : dbObj.database;
        resolve(response);
        });
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      let record = new this.DataModel(data);
      console.log(record);
      if (!validator.isValid(record, record.schema)) { reject('Invalid Object'); }
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }

        let dbObj;
        dbObj = data ? JSON.parse(data) : null;
        let jsonString;

        if (!dbObj) {
          dbObj = {};
        }
        dbObj[record.id] = record;
        jsonString = JSON.stringify(dbObj);
        fs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              data = record;
              resolve(data);
          }
        });
      });
    });
  }

  update(id, newData) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }

        let record = new this.DataModel(newData);
        console.log(record);
        if (!validator.isValid(record, record.schema)) { reject('Invalid Object'); }

        const dbObj = JSON.parse(data);
        dbObj[record.id] = record;
        return resolve(record);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }
  
        const dbObj = JSON.parse(data);
        dbObj.database = this.database.filter((record) => record.id !== id);
  
        return resolve(record);
      });
    });
  }
}

module.exports = FileCollection;