const {createOrGetChat, sendMessage, getMessagesByChatId} = require('../handlers/chatHandler');

module.exports = [
  {
    method: 'POST',
    path: '/chats',
    handler: createOrGetChat
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
