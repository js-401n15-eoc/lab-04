const Categories = require('../models/categories/categories.js');
const Validator = require('../lib/validator.js');

describe('Categories Model', () => {

  var categories;
  var validator;
  let obj;
  let badObj;
  let fakeId;

  beforeEach(() => {
    categories = new Categories();
    validator = new Validator();
    obj = { name: 'Test Category' };
    badObj = { name: 2341123423 };
    fakeId = 'asdfasldkj31412341234';
  });

  it('can post() a new category', () => {
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category with valid property types', () => {
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
              expect(validator.isCorrectType(category[0][key], category[0].schema.fields[key].type)).toEqual(true);
            });
          });
      });
  });

  it('will not post() an invalid object', () => {
    return categories.create(badObj)
      .then(record => {
        console.log('We are not supposed to hit this! ', record);
      }, failure => {
        expect(failure).toEqual('Invalid object');
      })
      .catch(e => console.error('ERR', e));
  });

  it('can update a category', () => {
    return categories.create(obj)
    .then(record => {
      return categories.get(record._id)
        .then(category => {
          obj.name = 'Test Category Changed';
          return categories.update(category[0].id, obj)
            .then(record => {
              expect(record.name).toEqual(obj.name);
            });
        });
      });
  });

  it('will not update a category with a bad object', () => {
    return categories.create(obj)
    .then(record => {
      return categories.get(record._id)
        .then(category => {
          return categories.update(category[0].id, badObj)
            .then(record => {
              console.log('We are not supposed to hit this! ', record);
            }, failure => {
              expect(failure).toEqual('Invalid object');
            });
        });
      });
  });

  it('can delete a category', () => {
    let obj2 = { name: 'Test Category 2' };
    return categories.create(obj)
      .then(() => {
        return categories.create(obj2)
      }).then(record => {
        return categories.get(record._id)
          .then(category => {
            categories.delete(category[0].id);
            categories.database.forEach(catLeft => {
              expect(catLeft.id).not.toEqual(category[0].id);
            });
        });
      });
  });

  it('will not delete a category if the ID does not exist in the database', () => {
    return categories.delete(fakeId)
    .then(records => {
      console.log('We are not supposed to hit this! ', records);
    }, failure => {
      expect(failure).toEqual('Entry not found');
    })
    .catch(e => console.error('ERR', e));
  });
});