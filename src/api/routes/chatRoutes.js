const {createOrGetChat, sendMessage, getMessagesByChatId} = require('../handlers/chatHandler');
const sanctumAuth = require('../middleware/sanctumAuth');
module.exports = [
  {
    method: 'POST',
    path: '/chats',
    handler: createOrGetChat,
    options: {
      pre: [
        sanctumAuth
      ]
    }
  },
  {
    method: 'POST',
    path: '/messages',
    handler: sendMessage
  },
  {
    method: 'GET',
    path: '/chats/{chat_id}/messages',
    handler: getMessagesByChatId
  }
];
