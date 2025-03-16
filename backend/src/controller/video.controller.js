import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
const VIDEO_ID = "qF0xOowhAnE";
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

export const updateTitle = asyncHandler(async (req, res) => {
  const newTitle = req.body.newTitle;
  const videoResponse = await axios.get(
    `${process.env.YOUTUBE_API_URI}/videos`,
    {
      params: {
        part: "snippet",
        id: VIDEO_ID,
        key: process.env.YOUTUBE_API_KEY,
      },
    }
  );

  const currentSnippet = videoResponse.data.items[0].snippet;
  await axios.put(
    `${process.env.YOUTUBE_API_URI}/videos?part=snippet`,
    {
      id: VIDEO_ID,
      snippet: { ...currentSnippet, title: newTitle },
    },
    { headers: { Authorization: `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}` } }
  );
  await prisma.eventLog.create({
    data: {
      action: "TITLE_UPDATED",
      videoId: VIDEO_ID,
      newTitle,
    },
  });
  return res.status(200).json(new ApiResponse(200, {}, "Title updated"));
});
