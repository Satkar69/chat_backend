import { findUserById, findChatUsers } from "../services/users.js";
import asynchandler from "../utils/asyncHandler.js";

export const getUser = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await findUserById(id);
  res.status(200).json({
    status: "success",
    statusCode: 200,
    user,
  });
});

export const getChatUsers = asynchandler(async (req, res, next) => {
  const loggedInUserId = req.user._id;
  const chatUsers = await findChatUsers(loggedInUserId);
  res.status(200).json({
    status: "success",
    statusCode: 200,
    chatUsers,
  });
});
