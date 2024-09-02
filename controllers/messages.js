import { getConvByUsers } from "../services/conversation.js";
import { createMessage } from "../services/messages.js";
import asynchandler from "../utils/asyncHandler.js";

export const sendMessage = asynchandler(async (req, res, next) => {
  const { id: recieverId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;
  const [conversation, newMessage] = await Promise.all([
    await getConvByUsers(senderId, recieverId),
    await createMessage(senderId, recieverId, message),
  ]);
  if (conversation && newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await conversation.save();
  res.status(201).json({
    status: "success",
    statusCode: 201,
    newMessage,
  });
});
