import { getConvByUsers } from "../services/conversation.js";
import { createMessage } from "../services/messages.js";
import asynchandler from "../utils/asyncHandler.js";

export const sendMessage = asynchandler(async (req, res, next) => {
  const { id: recieverId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;
  const conversation = await getConvByUsers(senderId, recieverId);
  const newMessage = await createMessage(senderId, recieverId, message);
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
