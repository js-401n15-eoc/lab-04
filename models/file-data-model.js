'use strict';

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
        let response = id ? dbObj[id] : dbObj;
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

        dbObj[newData.id] = newData;
        jsonString = JSON.stringify(dbObj);
        mockFs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              data = newData;
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

        if (!validator.isValid(record, record.schema)) { reject('Invalid object'); }

        const dbObj = JSON.parse(data);

        if (!dbObj[id]) { reject('Entry not found'); }

        dbObj[id] = record;
        const jsonString = JSON.stringify(dbObj);
        
        fs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              data = newData;
              resolve(data);
          }
        });
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

        if (!validator.isValid(record, record.schema)) { reject('Invalid object'); }

        const dbObj = JSON.parse(data);

        if (!dbObj[id]) { reject('Entry not found'); }

        dbObj[id] = record;
        const jsonString = JSON.stringify(dbObj);

        mockFs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              data = newData;
              resolve(data);
          }
        });
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

        if (!dbObj[id]) { reject('Entry not found'); }

        delete dbObj[id]; 
        const jsonString = JSON.stringify(dbObj);
        fs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              resolve(dbObj);
          }
        });
      });
    });
  }

  mockDelete(id) {
    return new Promise((resolve, reject) => {
      mockFs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }
  
        const dbObj = JSON.parse(data);
        if (!dbObj[id]) { reject('Entry not found'); }

        delete dbObj[id]; 
        const jsonString = JSON.stringify(dbObj);
        mockFs.writeFile(filePath, jsonString, (err, data) => {
          if (err) { reject(err); }
          else {
              resolve(dbObj);
          }
        });
      });
    });
  }
}

module.exports = FileCollection;