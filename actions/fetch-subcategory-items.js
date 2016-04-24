'use strict';

const Promise = require('bluebird');

const subcategoryItemsPayload = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "First card",
                "subtitle": "Element #1 of an hscroll",
                "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                "buttons": [{
                    "type": "web_url",
                    "url": "https://www.messenger.com",
                    "title": "web url"
                }, {
                    "type": "postback",
                    "title": "Postback",
                    "payload": "Payload for first element in a generic bubble",
                }],
            }, {
                "title": "Second card",
                "subtitle": "Element #2 of an hscroll",
                "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                "buttons": [{
                    "type": "postback",
                    "title": "Postback",
                    "payload": "Payload for second element in a generic bubble",
                }],
            }]
        }
    }
};

function getSubCategoryItems(selectedSubcategory) {
  return Promise.resolve('blah');
}

module.exports = (sessionId, context, cb) => {
  getSubCategoryItems(context.selectedSubcategory)
  .then((subcategoryItems) => {
    context.subcategoryItems = subcategoryItems;
    context.subcategoryItemsPayload = subcategoryItemsPayload;
    cb(context);
  });
};
