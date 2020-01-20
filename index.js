'use strict';

const Products = require('./models/products/products.js');
const Categories = require('./models/categories/categories.js');

const categories = new Categories();
const products = new Products();


let badObj = {
        name: 2345,
    }
categories.create(badObj).then(result => {
    console.log('result in create: ', result);
}).then(innerRes => {
    console.log('Is there anything here? ', innerRes);
}).catch(err => console.log('ERR :' , err));

let obj = {
    category_id: '123456', 
    price: 555,
    weight: 10,
    quantity_in_stock: 5,
  };

console.log('Product object to create: ', obj);
products.create(obj).then(record => {
    console.log('Did we get a record? ', record);
    obj.id = record.id;
    Object.keys(obj).forEach(key => {
        console.log('key: ', key, '        value: ', record[key]);
    });

    console.log('Lets try to edit!');
    let editObj = {
        category_id: '4444', 
        price: 5,
        weight: 1,
        quantity_in_stock: 2,
      };
    products.update(record.id, editObj).then(editedRecord => {
        console.log('Record after update: ', editedRecord);
        products.delete(record.id).then(recordsLeft => {
            console.log('Do we have anything left?', recordsLeft);
        });
    });
}).catch(e => console.error('ERR', e));
