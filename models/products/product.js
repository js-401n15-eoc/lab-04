'use strict';

const Model = require('../../models/model.js');

const schema = {
    fields: {
        id: { type: 'string', required: true },
        category_id: { type: 'string', required: true },
        price: { type: 'number', required: true },
        weight: { type: 'number' },
        quantity_in_stock: { type: 'number', required: true },
    }
};

class Product extends Model {
    constructor(data) {
        super(schema, data);
    }
}

module.exports = Product;