export const getConvByUsers = async (senderId, recieverId) => {
  const conversation = await CHATDB.Conversation.findOne({
    participants: { $all: [senderId, recieverId] },
  });

  if (!conversation) {
    return await createConv(senderId, recieverId);
  }

  return conversation;
};

export const createConv = async (senderId, recieverId) => {
  const conversation = await CHATDB.Conversation.create({
    participants: [senderId, recieverId],
  });
  return conversation;
};
