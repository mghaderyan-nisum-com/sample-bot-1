module.exports = (sessionId, context, cb) => {
  // Here should go the api call, e.g.:
  context.subcategories = 'heels, sneakers, sandals';
  console.log('fetch-sub-categories', context);
  cb(context);
};
