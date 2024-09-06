import {
  getConversationByUsers,
  getConversationMessages,
} from "../services/conversation.js";
import { createMessage } from "../services/messages.js";
import { getRecieverSocketId, io } from "../socket/socket.io.js";
import asynchandler from "../utils/asyncHandler.js";

export const sendMessage = asynchandler(async (req, res, next) => {
  const { id: recieverId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;
  const [conversation, newMessage] = await Promise.all([
    await getConversationByUsers(senderId, recieverId),
    await createMessage(senderId, recieverId, message),
  ]);
  if (conversation && newMessage) {
    conversation.messages.push(newMessage._id);
  }

  await conversation.save();

  // socket.io functionality
  const recieverSocketId = getRecieverSocketId(recieverId);
  if (recieverSocketId) {
    // io.to(<socket_id>).emit() is used to send events to specific client with event name here 'newMessage'
    io.to(recieverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json({
    status: "success",
    statusCode: 201,
    newMessage,
  });
});

export const getMessages = asynchandler(async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;
  const messages = await getConversationMessages(senderId, userToChatId);
  res.status(200).json({
    status: "success",
    statusCode: 200,
    messages,
  });
});
