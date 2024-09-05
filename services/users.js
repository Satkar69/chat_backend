export const findUserById = async (userId) => {
  const user = await CHATDB.User.findById(userId).select("-password");
  return user;
};

export const findChatUsers = async (userId) => {
  const users = await CHATDB.User.find({ _id: { $ne: userId } }).select(
    "-password"
  );
  return users;
};
