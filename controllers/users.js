import { findChatUsers } from "../services/users.js";
import asynchandler from "../utils/asyncHandler.js";

export const getChatUsers = asynchandler(async (req, res, next) => {
  const loggedInUserId = req.user._id;
  const chatUsers = await findChatUsers(loggedInUserId);
  res.status(200).json({
    status: "success",
    statusCode: 200,
    chatUsers,
  });
});
