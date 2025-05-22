const { Chat, Message } = require('../../models');


const createOrGetChat = async (request, h) => {
    const { user_id, mitra_id } = request.payload;

    let chat = await Chat.findOne({
      where: { user_id, mitra_id }
    });

    if (!chat) {
      chat = await Chat.create({
        user_id,
        mitra_id,
        last_message: ''
      });
    }

    return h.response(chat).code(200);
  }

  const sendMessage= async (request, h) => {
    const { chat_id, sender_id, message } = request.payload;

    const msg = await Message.create({
      chat_id,
      sender_id,
      message,
      is_read: false
    });

    // Update last message in Chat
    await Chat.update(
      { last_message: message },
      { where: { id: chat_id } }
    );

    return h.response(msg).code(201);
  }

  const getMessagesByChatId = async (request, h) => {
    const { chat_id } = request.params;

    const messages = await Message.findAll({
      where: { chat_id },
      order: [['createdAt', 'ASC']]
    });

    return h.response(messages).code(200);
  }



module.exports = {
    createOrGetChat,
    sendMessage,
    getMessagesByChatId
}
