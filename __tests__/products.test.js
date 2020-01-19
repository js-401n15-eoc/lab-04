const Products = require('../models/products/products.js');
const Validator = require('../lib/validator.js');

describe('Products Model', () => {

  let products;
  let validator;
  let obj;

  beforeEach(() => {
    products = new Products();
    validator = new Validator();
    obj = {
      id: '12345', 
      category_id: '5555',
      price: 444,
      weight: 0.5,
      quantity_in_stock: 10,
    };
  });

  it('can post() a new product', () => {
    return products.mockCreate(obj)
      .then(record => {
        console.log('record from post? ', record);
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    return products.mockCreate(obj)
      .then(record => {
        console.log('anything from create in get? ', record);
        return products.mockGet(record.id)
          .then(product => {
            console.log('anything from product? ', product);
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

  // it('can update a product', () => {
  //   let obj = {
  //     category_id: '123456', 
  //     price: 555,
  //     weight: 10,
  //     quantity_in_stock: 5,
  //   };
  //   return products.mockCreate(obj)
  //   .then(record => {
  //     return products.mockGet(record._id)
  //       .then(product => {
  //         obj.price = 2;
  //         return products.mockUpdate(product.id)
  //           .then(record => {
  //             expect(record.price).toEqual(obj.price);
  //           });
  //       });
  //     });
  // });

  //   it('can delete a product', () => {
  //     let obj = { 
  //       price: 555,
  //       weight: 10,
  //       quantity_in_stock: 5,
  //     };
      
  //     let obj2 = { 
  //       price: 123,
  //       quantity_in_stock: 44,
  //     };

  //     return products.create(obj)
  //       .then(() => {
  //         return products.create(obj2)
  //       }).then(record => {
  //         return products.get(record._id)
  //           .then(product => {
  //             products.delete(product[0].id);
  //             products.database.forEach(prodLeft => {
  //               expect(prodLeft.id).not.toEqual(product[0].id);
  //             });
  //         });
  //       });
  //   });
});