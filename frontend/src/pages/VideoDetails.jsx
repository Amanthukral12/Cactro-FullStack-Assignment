import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

const VideoDetails = () => {
  const VIDEO_ID = "qF0xOowhAnE";
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const fetchVideo = async () => {
    try {
      const result = await axios.get(`/api/video/${VIDEO_ID}`);
      setVideo(result.data.data);
    } catch (error) {
      setError(error);
    }
  };
  const fetchComments = async () => {
    try {
      const result = await axios.get(`api/video/comments/${VIDEO_ID}`);
      setComments(result.data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put("/api/video/updateTitle", { newTitle: title }, config);
      setShowForm(false);
      fetchVideo();
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("/api/video/addComment", { comment }, config);
      setComment("");
      fetchComments();
    } catch (error) {
      setError(error);
    }
  };

  const handleDelete = async (commentId) => {
    await axios.delete(`/api/video/comment/${commentId}`);
    fetchComments();
  };

  return (
    <main className="min-h-screen mb-16">
      {error && <h1>{error}</h1>}
      <h1 className="text-xl lg:text-4xl my-4 text-center">
        Cactro FullStack Assignment
      </h1>

      <Navbar />
      <div className="w-4/5 mx-auto">
        {video?.items.map((item) => (
          <div key={item.id}>
            <img
              src={item.snippet.thumbnails.maxres.url}
              alt="video thumbnail"
              className="w-full"
            />
            <p className="text-2xl font-bold">
              {item.snippet.title}{" "}
              <button
                className="bg-[#3a4c8fe5] text-lg py-2 px-4 text-white rounded-2xl"
                onClick={() => setShowForm(!showForm)}
              >
                Edit
              </button>
              {showForm ? (
                <form className="w-full mt-4" onSubmit={handleTitleSubmit}>
                  <input
                    type="text"
                    placeholder="Edit Video Title"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full lg:w-4/5 mb-2 lg:mb-0 mr-4 bg-gray-300 font-normal text-lg py-2 px-4 rounded-2xl focus:outline-none"
                  />
                  <button className="bg-[#3a4c8fe5] font-normal text-lg py-2 px-12 text-white rounded-2xl">
                    Submit
                  </button>
                </form>
              ) : null}
            </p>
            <p className="text-lg font-medium">{item.snippet.channelTitle}</p>
            <p className="text-gray-600">{item.statistics.viewCount} views</p>
            <p className="text-lg bg-gray-300 p-4 my-2">
              {item.statistics.commentCount}{" "}
              {item.statistics.commentCount === "1" ? "Comment" : "Comments"}
            </p>
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Add new comment"
                value={comment}
                onChange={handleChange}
                className="w-full lg:w-4/5 mb-2 lg:mb-0 mr-4 bg-gray-300 py-2 px-4 rounded-2xl focus:outline-none"
              />
              <button className="bg-[#3a4c8fe5] py-2 px-12 text-white rounded-2xl">
                Submit
              </button>
            </form>
            <div className="mt-4">
              {comments?.map((comment) => (
                <div
                  key={comment.commentId}
                  className="flex my-2 justify-between"
                >
                  <div className="flex">
                    <p className="font-medium mr-4">{comment.author}</p>
                    <p>{comment.text}</p>
                  </div>
                  <button onClick={() => handleDelete(comment.commentId)}>
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default VideoDetails;
