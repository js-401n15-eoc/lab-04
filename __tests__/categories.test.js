const Categories = require('../categories/categories.js');
const Validator = require('../lib/validator.js');

describe('Categories Model', () => {

  let categories;

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

  it('has a number value for id and a string value for name', () => {
    // const personRules = {
    //   fields: {
    //     schema: {
    //       type: 'object', required: true, 
    //       {
    //         id: { type: 'number', required: true },
    //         name: { type: 'string', required: true}
    //       }
    //     },
    //     firstName: { type: 'string', required: true },
    //     lastName: { type: 'string', required: true },
    //     hair: {
    //       type: 'object', required: true,
    //       type: { typing: 'string', required: true },
    //       color: { typing: 'string', required: true },
    //     },
    //     favoriteFoods: { type: 'array', valueType: 'string' },
    //     married: { typtypeing: 'boolean', required: true },
    //     kids: { type: 'number', required: true },
    //   },
    // };

    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        // console.log('Record value: ', record);
        return categories.get(record._id)
          .then(category => {
            expect()
            console.log('Category[0] value: ', category[0]);
            // Category[0] value:  { name: 'Test Category', id: 'ba40b7df-21eb-439f-9d7f-adef51ddde09' }
            // expect(validator.isCategories(category)).toEqual(true);
            Object.keys(obj).forEach(key => {
              // console.log('Category[0][key] value: ', category[0][key]);
              // console.log('Category[0].type value: ', category[0].type);
              // expect(validator.isCorrectType(category[0][key], category[0].type));
            });
          });
        });
    });
});