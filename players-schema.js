const Products = require('./models/products.js');
const Validator = require('./lib/validator.js');

console.log('testing 1-2-3');

const products = new Products();
const validator = new Validator();

let obj = { 
    price: 555,
    weight: 10,
    quantity_in_stock: 5,
  };

console.log('Product object to create: ', obj);
products.create(obj, products).then(record => {
    Object.keys(obj).forEach(key => {
        console.log('record[key] value: ', record[key]);
    });
}).catch(e => console.error('ERR', e));