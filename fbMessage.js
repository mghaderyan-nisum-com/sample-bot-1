'use strict';

const request = require('request');

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
    const opts = {
      form: {
        recipient: {
          id: recipientId,
        },
        message: {
          text: msg,
        },
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
