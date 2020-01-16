const Categories = require('../categories/categories.js');
const Validator = require('../lib/validator.js');

describe('Categories Model', () => {

  let categories;
  let validator;

  beforeEach(() => {
    categories = new Categories();
    validator = new Validator();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('contains values that have the same types defined in the class schema', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(validator.isCorrectType(category[0][key], categories.schema[key].type)).toEqual(true);
            });
          });
        });
    });

    it('can update a category', () => {
      let obj = { name: 'Test Category 1' };
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

    it('can delete a category', () => {
      let obj = { name: 'Test Category 1' };
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
});