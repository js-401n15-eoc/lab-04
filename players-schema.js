const Products = require('./models/products/products.js');
const Validator = require('./lib/validator.js');
const Categories = require('./models/categories/categories.js');

const categories = new Categories();
const products = new Products();
const validator = new Validator();


// let badObj = {
    //     name: 2345,
    // }
// categories.create(badObj).then(resut => {
//     console.log('result in create: ', result);
// }).catch(err => console.log('ERR :' , err));

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
    products.update(record.id, editObj).then(editedRecord => console.log('Record after update: ', editedRecord));
}).catch(e => console.error('ERR', e));

// let obj2 = {
//     category_id: '654321', 
//     price: 444,
//     quantity_in_stock: 1,
//   };

// console.log('Product object to create: ', obj2);
// products.create(obj2, products).then(record => {
//     console.log('Did we get a record? ', record);
//     Object.keys(obj2).forEach(key => {
//         console.log('key: ', key, '        value: ', record[key]);
//     });
// }).catch(e => console.error('ERR', e));

// products.get(obj.id).then(record => {
//     console.log('Record from second get: ', record[0]);
// });
