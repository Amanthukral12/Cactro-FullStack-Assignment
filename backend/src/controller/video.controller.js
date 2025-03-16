import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
export const getVideo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await axios.get(`${process.env.YOUTUBE_API_URI}/videos`, {
    params: {
      part: "snippet,contentDetails,statistics",
      id,
      key: process.env.YOUTUBE_API_KEY,
    },
  });

  if (!result) {
    throw new ApiError(404, "Video not found", ["Video not found"]);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, result.data, "Video successfully fetched"));
});
