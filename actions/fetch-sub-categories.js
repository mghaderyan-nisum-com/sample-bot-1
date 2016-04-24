'use strict';

const Promise = require('bluebird');

function getSubCategories(category) {
  const map = {
    'shoes': 'heels, sneakers, sandals',
    'jeans': 'slim, skinny, straight',
  };
  return Promise.resolve(map[category]);
}

module.exports = (sessionId, context, cb) => {
  getSubCategories(context.category)
  .then((subcategories) => {
    context.subcategories = subcategories;
    cb(context);
  });
};
