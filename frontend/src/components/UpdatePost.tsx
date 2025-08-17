import axios from "axios";
import React, { useState, useEffect } from "react";

interface UpdatePostProps {
  postId: string;
  onClose: () => void;
}

const UpdatePost = ({ postId, onClose }: UpdatePostProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `https://backend.harshgolyan308.workers.dev/api/v1/blog/get-blog/${postId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        const postData = response.data;
        setTitle(postData.title);
        setContent(postData.content);
      } catch (error) {
        console.log("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("No JWT found, please sign in.");

      await axios.put(
        "https://backend.harshgolyan308.workers.dev/api/v1/blog/update-blog",
        {
          id: postId,
          title,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-md min-w-[350px]">
      <h1 className="text-2xl font-bold mb-6 text-primary text-center">
        Update the Post
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block text-primary font-medium mb-2">Title</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-primary rounded-md bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your post title"
            required
          />
        </div>

        <div>
          <label className="block text-primary font-medium mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-primary rounded-md h-40 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your content here"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-secondary font-semibold py-2 rounded-md hover:opacity-90 transition"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
