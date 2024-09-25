import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Skeleton from './Skeleton';
import axios from "axios";
import Navbar from "./Navbar";
import { Ellipsis } from "lucide-react";
import EllipsePop from "./EllipsePop";

type myposts = {
    title: string;
    content: string;
    author: string;
};

const MyPosts = ({ title, content, author }: myposts) => {
    const [showDelete, setShowDelete] = useState(false);

    const deleteHandler = () => {
        setShowDelete((prev) => !prev);
    };

    return (
        <div className="relative"> {/* Make this container relative */}
            <div className="h-auto w-[90vw] mx-5 rounded-lg border m-5 p-3 flex flex-col bg-slate-700">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex justify-start items-center">
                        <div>
                            <Avatar initials={author ? author[0].toUpperCase() : "N/A"} />
                        </div>
                        <div className="text-white font-thin pl-4">
                            {author || "Unknown Author"}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex cursor-pointer" onClick={deleteHandler}>
                            <Ellipsis color="white" size={40} />
                        </div>
                        {showDelete && (
                            <div className="absolute right-10 top-full mt-2 z-20">
                                <EllipsePop />
                            </div>
                        )}
                    </div>
                </div>
                <div className="font-bold text-4xl text-white mb-2">
                    {title}
                </div>
                <div className="font-medium text-lg text-white mb-2">
                    {content.length > 200 ? `${content.substr(0, 200)}...` : content}
                </div>
                <div className="mt-auto text-white">
                    Read time: {Math.ceil(content.length / 100)} minutes
                </div>
            </div>
        </div>
    );
};

export default MyPosts;

interface MyPostsData {
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export function MyPostsArray() {
  const [blogs, setBlogs] = useState<MyPostsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogsHandler = async () => {
      try {
        const response = await axios.get(
          "https://backend.harshgolyan308.workers.dev/api/v1/blog/my-blogs",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        console.log(response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    blogsHandler();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen">
      <div>
        <Navbar />
        <div className="pt-[20vh] mx-[3%]">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          ) : (
            blogs.map((item, index) => (
              <MyPosts key={index} title={item.title} content={item.content} author={item.author.name} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
