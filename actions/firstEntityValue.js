'use strict';

const _ = require('lodash');

module.exports = (entities) => {
  return _.head(entities.intent).value;
}
