const sessionHandler = require('../sessionHandler');
const firstEntityValue = require('./firstEntityValue');
const fetchSubCategories = require('./fetch-sub-categories');

module.exports = (fbMessage) => {
  const actions = {
    say(sessionId, context, message, cb) {
      // Our bot has something to say!
      // Let's retrieve the Facebook user whose session belongs to
      const recipientId = sessionHandler.getSession(sessionId).fbid;
      if (recipientId) {
        // Yay, we found our recipient!
        // Let's forward our bot response to her.
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
      const category = firstEntityValue(entities);
      if (category) {
        context.category = category;
      }
      cb(context);
    },
    error(sessionId, context, error) {
      console.log('####', error.message);
    },
    'fetch-sub-categories': fetchSubCategories,
    // You should implement your custom actions here
    // See https://wit.ai/docs/quickstart
  };
  return actions;
}
