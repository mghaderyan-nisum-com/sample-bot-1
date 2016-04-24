'use strict';

const request = require('request');
const _ = require('lodash');

module.exports = (FB_PAGE_TOKEN) => {
  // See the Send API reference
  // https://developers.facebook.com/docs/messenger-platform/send-api-reference
  const fbReq = request.defaults({
    uri: 'https://graph.facebook.com/me/messages',
    method: 'POST',
    json: true,
    qs: { access_token: FB_PAGE_TOKEN },
    headers: {'Content-Type': 'application/json'},
  });

  const fbMessage = (recipientId, msg, cb) => {
    var message = '';
    console.log(msg);
    if (_.isString(msg)) {
      message = {
        text: msg,
      }
    } else if (_.isObject(msg)) {
      message = msg;
    };

    const opts = {
      form: {
        recipient: {
          id: recipientId,
        },
        message: message,
      },
    };
    fbReq(opts, (err, resp, data) => {
      if (cb) {
        cb(err || data.error && data.error.message, data);
      }
    });
  };
  return fbMessage;
};
