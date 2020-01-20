const Products = require('../models/products/products.js');

describe('Products Model', () => {

  let products;
  let obj;
  let badObj;

  beforeEach(() => {
    products = new Products();
    obj = {
      id: '12345', 
      category_id: '5555',
      price: 444,
      weight: 0.5,
      quantity_in_stock: 10,
    };
  
    badObj = {
      id: '666', 
      category_id: 5555,
      price: 'too much',
      weight: '1 lb',
      quantity_in_stock: 10,
    };
  });

  it('can post() a new product', () => {
    return products.mockCreate(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  
  it('will not post() an invalid object', () => {
    return products.mockCreate(badObj)
      .then(record => {
        console.log('We are not supposed to hit this! ', record);
      }, failure => {
        expect(failure).toEqual('Invalid object');
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    return products.mockGet(obj.id)
      .then(product => {
        Object.keys(obj).forEach(key => {
          expect(product[key]).toEqual(obj[key]);
        });
      });
  });

  it('can update a product', () => {
    let newObj = {
      category_id: '5555',
      price: 430,
      weight: 0.5,
      quantity_in_stock: 15,
    };

    return products.mockUpdate(obj.id, newObj)
      .then(record => {
        Object.keys(newObj).forEach(key => {
          expect(record[key]).toEqual(newObj[key])
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('will not update a product with a bad object', () => {
    return products.mockUpdate(obj.id, badObj)
      .then(record => {
        console.log('We are not supposed to hit this! ', record);
      }, failure => {
          expect(failure).toEqual('Invalid object');
        })
      .catch(e => console.error('ERR', e));
  });

  it('can delete a product', () => {
    return products.mockDelete(obj.id)
    .then(records => {
      Object.keys(records).forEach(key => {
        expect(key).not.toEqual(obj.id);
      });
    })
    .catch(e => console.error('ERR', e));
  });
});
