export const createMessage = async (senderId, recieverId, message) => {
  const newMessage = await CHATDB.Message.create({
    senderId,
    recieverId,
    message,
  });
  return newMessage;
};
