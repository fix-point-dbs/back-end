const { success, error } = require('../../utils/ApiResponser');
const { createChat, createMessage, getMessageById } = require('../../services/chatServices');
const {getUser} = require('../../utils/VerificationToken');
const createOrGetChat = async (request, h) => {
    try {
      const chat = await createChat(request);
      return h.response(success(chat, "Data berhasil", 200)).code(200);
    } catch (err) {
      return h.response(error({}, err.message, 500)).code(500);
    }

  }

  const sendMessage= async (request, h) => {
    try {
      const message = await createMessage(request);
      return h.response(success(message, "berhasil ditambahkan", 201)).code(201);
    } catch (err) {
      return h.response(error({}, err, 500)).code(500);
    }

  }

  const getMessagesByChatId = async (request, h) => {
    try {
      const messages = await getMessageById(request);
      return h.response(success(messages, "Data berhasil diambil")).code(200);
    } catch (err) {
      return h.response(error({}, err, 500)).code(500);
    }
  }
module.exports = {
    createOrGetChat,
    sendMessage,
    getMessagesByChatId
}
