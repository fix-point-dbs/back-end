const { Chat, Message } = require('../models');

const createChat = async (data) => {
    const { mitra_id, user_id } = data.payload;
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

    return chat;
}

const createMessage = async (data) => {
    const { chat_id, sender_id, message } = data.payload;

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

    return msg;
}

const getMessageById = async (data) => {
    const { chat_id } = data.params;

    const messages = await Message.findAll({
      where: { chat_id },
      order: [['createdAt', 'ASC']]
    });

    return messages;
}
module.exports = { createChat, createMessage, getMessageById };