'use strict';

const _ = require('lodash');

module.exports = (entities) => {
  const first = _.head(entities.intent);
  if (first) {
    return first.value;
  }
  return null;
}
