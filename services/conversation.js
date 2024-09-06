export const getConversationByUsers = async (senderId, recieverId) => {
  const conversation = await CHATDB.Conversation.findOne({
    participants: { $all: [senderId, recieverId] },
  });

  if (!conversation) {
    return await createConversation(senderId, recieverId);
  }

  return conversation;
};

export const createConversation = async (senderId, recieverId) => {
  const conversation = await CHATDB.Conversation.create({
    participants: [senderId, recieverId],
  });
  return conversation;
};

export const getConversationMessages = async (senderId, userToChatId) => {
  const conversation = await CHATDB.Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages");

  if (!conversation) {
    return [];
  }

  return conversation.messages;
};
