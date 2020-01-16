const Products = require('../models/products.js');
const Validator = require('../lib/validator.js');

describe('Products Model', () => {

  let products;
  let validator;
  
  beforeEach(() => {
    products = new Products();
    validator = new Validator();
  });

  it('can post() a new product', () => {
    let obj = { 
      price: 555,
      weight: 10,
      quantity_in_stock: 5,
    };
    return products.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    let obj = { 
      price: 555,
      weight: 10,
      quantity_in_stock: 5,
    };
    return products.create(obj)
      .then(record => {
        return products.get(record._id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('contains values that have the same types defined in the class schema', () => {
    let obj = { 
      price: 555,
      weight: 10,
      quantity_in_stock: 5,
    };
    return products.create(obj)
      .then(record => {
        return products.get(record._id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(validator.isCorrectType(product[0][key], products.schema[key].type)).toEqual(true);
            });
          });
        });
    });

    it('can update a product', () => {
      let obj = { 
        price: 555,
        weight: 10,
        quantity_in_stock: 5,
      };
      return products.create(obj)
      .then(record => {
        return products.get(record._id)
          .then(product => {
            obj.price = 2;
            return products.update(product[0].id, obj)
              .then(record => {
                expect(record.price).toEqual(obj.price);
              });
          });
        });
    });

    it('can delete a product', () => {
      let obj = { 
        price: 555,
        weight: 10,
        quantity_in_stock: 5,
      };
      
      let obj2 = { 
        price: 123,
        quantity_in_stock: 44,
      };

      return products.create(obj)
        .then(() => {
          return products.create(obj2)
        }).then(record => {
          return products.get(record._id)
            .then(product => {
              products.delete(product[0].id);
              products.database.forEach(prodLeft => {
                expect(prodLeft.id).not.toEqual(product[0].id);
              });
          });
        });
    });
});