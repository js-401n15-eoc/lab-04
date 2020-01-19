'use strict';

const uuid = require('uuid/v4');
const mockFs = require('../__mocks__/fs.js');
const fs = require('fs');
const Validator = require('../lib/validator.js');
const filePath = `${__dirname}/data/products.json`;
const validator = new Validator();

class Collection {
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

  create(record, objType) {
    return new Promise((resolve, reject) => {
      record.id = uuid();
      console.log(this.schema);
      if (!validator.isValid(record, objType)) { reject('Invalid Object'); }
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        let dbObj;
        
        dbObj = data ? JSON.parse(data) : null;
        let jsonString;
        if (!dbObj.database) {
          dbObj = {
            database: []
          };
        }
        dbObj.database.push(record);
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

  update(id, record) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }
  
        const dbObj = JSON.parse(data);
        dbObj.database = dbObj.database.map((item) => (item.id === id) ? record : item);
  
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

module.exports = Collection;