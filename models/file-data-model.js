'use strict';

const uuid = require('uuid/v4');
const mockFs = require('../__mocks__/fs.js');
const fs = require('fs');
const Validator = require('../lib/validator.js');
const filePath = `${__dirname}/data/products.json`;
const mockPath = `${__dirname}/data/mock-products.json`;

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

  mockGet(id) {
    return new Promise((resolve, reject) => {
      try {
        let dbObj = {"12345":{"id":"12345","category_id":"5555","price":444,"weight":0.5,"quantity_in_stock":10},
        "54321":{"id":"54321","category_id":"777","price":555,"quantity_in_stock":4}};  
        let response = id ? dbObj["12345"] : dbObj;
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
  create(data) {
    return new Promise((resolve, reject) => {
      let record = new this.DataModel(data);
      // console.log(record);
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

  mockCreate(data) {
    return new Promise((resolve, reject) => {
      let dbObj = {"54321":{"id":"54321","category_id":"777","price":555,"quantity_in_stock":4}};
      dbObj[data.id] = {"id":"12345","category_id":"5555","price":444,"weight":0.5,"quantity_in_stock":10};
      resolve(JSON.stringify(dbObj));
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