export const findChatUsers = async (userId) => {
  const users = await CHATDB.User.find({ _id: { $ne: userId } }).select(
    "-password"
  );
  return users;
};
