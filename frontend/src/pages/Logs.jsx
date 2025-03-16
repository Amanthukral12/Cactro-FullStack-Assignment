import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const fetchLogs = async () => {
    try {
      const result = await axios.get("/api/logs");
      return result.data;
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await fetchLogs();
      setLogs(responseData);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen mb-16">
      {error && <h1>{error}</h1>}
      <h1 className="text-xl lg:text-4xl my-4 text-center">
        Cactro FullStack Assignment
      </h1>

      <Navbar />
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        {logs?.data?.map((log) => (
          <div key={log.id} className="bg-blue-50 border-2 border-gray-400 p-2">
            <p>Action: {log.action}</p>
            <p>Video Id: {log.videoId}</p>
            <p>CommentId: {log.commentId}</p>
            <p>New Title: {log.newTitle}</p>
            <p>Old Title: {log.oldTitle}</p>
            <p>TimeStamp: {log.timestamp}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Logs;
