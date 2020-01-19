'use strict';

let uuid = require('uuid').v4;
let Validator = require('../lib/validator.js');
let validator = new Validator();

class Model {

  constructor(schema, data) {
    this.schema = schema;
    console.log('value of data in model: ', data);
    data.id = uuid();
    if (validator.isValid(this.schema, data)) {
      console.log('Are we hitting this?');
      Object.keys(this.schema.fields).forEach(key => {
        if (data[key]) { this[key] = data[key]; }
      });
    }
  }
}

module.exports = Model;