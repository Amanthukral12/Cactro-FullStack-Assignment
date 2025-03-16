import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import prisma from "../db/db.js";

const VIDEO_ID = "qF0xOowhAnE";
const CHANNEL_ID = "UC72pnSp-3vdjYv2owUMzlHQ";
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
      oldTitle: currentSnippet.title,
    },
  });
  return res.status(200).json(new ApiResponse(200, {}, "Title updated"));
});

export const addComment = asyncHandler(async (req, res) => {
  const comment = req.body.comment;
  const result = await axios.post(
    `${process.env.YOUTUBE_API_URI}/commentThreads?part=snippet`,
    {
      snippet: {
        videoId: VIDEO_ID,
        channelId: CHANNEL_ID,
        topLevelComment: {
          snippet: {
            textOriginal: comment,
          },
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const commentId = result.data.id;
  await prisma.eventLog.create({
    data: {
      action: "COMMENT_ADDED",
      videoId: VIDEO_ID,
      commentId,
    },
  });
  return res.status(201).json(new ApiResponse(201, commentId, "Comment Added"));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;

  await axios.delete(
    `${process.env.YOUTUBE_API_URI}/comments?id=${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`,
      },
    }
  );
  await prisma.eventLog.create({
    data: { action: "COMMENT_DELETED", videoId: VIDEO_ID, commentId },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export const fetchComments = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const comments = await axios.get(
    `${process.env.YOUTUBE_API_URI}/commentThreads`,
    {
      params: {
        part: "snippet",
        videoId,
        key: process.env.YOUTUBE_API_KEY,
        maxResults: 10,
      },
    }
  );
  const formattedComments = comments.data.items.map((item) => ({
    commentId: item.id,
    text: item.snippet.topLevelComment.snippet.textDisplay,
    author: item.snippet.topLevelComment.snippet.authorDisplayName,
  }));
  return res
    .status(200)
    .json(
      new ApiResponse(200, formattedComments, "Comments fetched successfully")
    );
});
