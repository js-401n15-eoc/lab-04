'use strict';

const Model = require('../model.js');

const schema = {
    fields: {
        id: { type: 'string', required: true },
        name: { type: 'string', required: true },
    }
  };

class Category extends Model {
    constructor(data) {
        super(schema, data);
    }
}

module.exports = Category;