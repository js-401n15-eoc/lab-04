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
        let response = id ? dbObj[id] : dbObj;
        resolve(response);
        });
    });
  }

  mockGet(id) {
    return new Promise((resolve, reject) => {
      mockFs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }

        const dbObj = JSON.parse(data);
        // console.log('dbObj in mockGet: ', dbObj);
        // console.log('do we have an id? ', id);
        let response = id ? dbObj[id] : dbObj;
        // console.log('response in mockget: ', response);
        resolve(response);
      });
    });
  }
  create(data) {
    return new Promise((resolve, reject) => {
      let record = new this.DataModel(data);

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

  mockCreate(newData) {
    return new Promise((resolve, reject) => {
      mockFs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }

        let dbObj;
        dbObj = data ? JSON.parse(data) : null;
        let jsonString;

        if (!dbObj) {
          dbObj = {};
        }

        // console.log('looking at dbObj: ', dbObj);

        dbObj[newData.id] = newData;
        jsonString = JSON.stringify(dbObj);
        mockFs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              data = newData;
              // console.log('data before the resolve: ', data);
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
        record.id = id;
        // console.log(record);
        if (!validator.isValid(record, record.schema)) { reject('Invalid Object'); }

        const dbObj = JSON.parse(data);
        dbObj[id] = record;
        const jsonString = JSON.stringify(dbObj);
        
        fs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              data = newData;
              // console.log('data before the resolve: ', data);
              resolve(data);
          }
        });
        // return resolve(dbObj);
      });
    });
  }

  mockUpdate(id, newData) {
    return new Promise((resolve, reject) => {
      mockFs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }

        let record = new this.DataModel(newData);
        record.id = id;
        console.log('dis record: ', record);
        if (!validator.isValid(record, record.schema)) { reject('Invalid Object'); }
        // console.log('the record: ', record);
        newData.id = id;
        const dbObj = JSON.parse(data);
        console.log('dbObj right after the parse; ', dbObj);
        dbObj[id] = newData;
        console.log('What is dbObj now? ', dbObj);
        const jsonString = JSON.stringify(dbObj);

        mockFs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              // console.log('original data info: ', JSON.parse(data));
              // console.log('new data info: ', newData);
              let response = newData;
              // response.id = id;
              console.log('response before resolve: ', response);
              resolve(response);
          }
        });
        // const dbObj = JSON.parse(record);
        // dbObj[id] = record;
        // console.log('dbObj at the end: ', dbObj);
        // return resolve(record);
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
        // dbObj.database = this.database.filter((record) => record.id !== id);
        delete dbObj[id]; 
        const jsonString = JSON.stringify(dbObj);
        fs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              // data = newData;
              // console.log('data before the resolve: ', data);
              resolve(data);
          }
        });
      });
    });
  }
}

module.exports = FileCollection;