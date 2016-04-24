'use strict';

const Promise = require('bluebird');

function getSubCategoryItems(selectedSubcategory) {
  return Promise.resolve('blah');
}

module.exports = (sessionId, context, cb) => {
  getSubCategoryItems(context.selectedSubcategory)
  .then((subcategoryItems) => {
    context.subcategoryItems = subcategoryItems;
    cb(context);
  });
};
