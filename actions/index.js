const sessionHandler = require('../sessionHandler');
const firstEntityValue = require('./firstEntityValue');
const fetchSubCategories = require('./fetch-sub-categories');
const fetchSubcategoryItems = require('./fetch-subcategory-items');

const messageData = {
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

module.exports = (fbMessage) => {
  const actions = {
    say(sessionId, context, message, cb) {
      // Our bot has something to say!
      // Let's retrieve the Facebook user whose session belongs to
      const recipientId = sessionHandler.getSession(sessionId).fbid;
      if (recipientId) {
        // Yay, we found our recipient!
        // Let's forward our bot response to her.
        console.log('right before calling fbMessage in say method', 'context is:', context, 'message is:', message);
        fbMessage(recipientId, message, (err, data) => {
          if (err) {
            console.log(
              'Oops! An error occurred while forwarding the response to',
              recipientId,
              ':',
              err
            );
          }

          // Let's give the wheel back to our bot
          cb();
        });
      } else {
        console.log('Oops! Couldn\'t find user for session:', sessionId);
        // Giving the wheel back to our bot
        cb();
      }
    },
    merge(sessionId, context, entities, message, cb) {
      console.log('**** entities', entities);
      console.log('**** context', context);
      if (!context.category) {
        const category = firstEntityValue(entities, 'intent');
        if (category) {
          context.category = category;
        }
      }
      else if (!context.selectedSubcategory) {
        const selectedSubcategory = firstEntityValue(entities, 'intent');
        if (selectedSubcategory) {
          context.selectedSubcategory = selectedSubcategory;
        }
      }
      cb(context);
    },
    error(sessionId, context, error) {
      console.log('####', error.message);
    },
    'fetch-sub-categories': fetchSubCategories,
    'fetch-subcategory-items': fetchSubcategoryItems,
    // You should implement your custom actions here
    // See https://wit.ai/docs/quickstart
  };
  return actions;
}
