'use strict';

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {}};
  }
  return sessionId;
};

const getSession = (sessionId) => {
  return sessions[sessionId];
};

const updateContextForSession = (sessionId, newContext) => {
  sessions[sessionId].context = newContext;
};

module.exports = {
  findOrCreateSession: findOrCreateSession,
  getSession: getSession,
  updateContextForSession: updateContextForSession,
}
