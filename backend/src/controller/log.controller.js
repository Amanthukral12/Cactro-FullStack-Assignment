import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../db/db.js";
export const getLogs = asyncHandler(async (req, res) => {
  const logs = await prisma.eventLog.findMany();
  return res
    .status(200)
    .json(new ApiResponse(200, logs, "Logs fetched successfully"));
});
