import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Skeleton from './Skeleton';
import axios from "axios";
import Navbar from "./Navbar";
import { Ellipsis } from "lucide-react";
import EllipsePop from "./EllipsePop";

type MyPostsProps = {
  id: string;
  title: string;
  content: string;
  author: string;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
  onPostDeleted : string | void;
  onPostUpdated : string | void;
};

const MyPosts = ({ id, title, content, author, index, openIndex, setOpenIndex, onPostDeleted, onPostUpdated }: MyPostsProps) => {
  const isOpen = openIndex === index;

  const togglePopUp = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <div className="relative">
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
            <div className="flex cursor-pointer" onClick={togglePopUp}>
              <Ellipsis color="white" size={40} />
            </div>
            {isOpen && (
              <div className="absolute right-10 top-full mt-2 z-20">
                <EllipsePop
                  postId={id}
                  onPostDeleted={onPostDeleted}
                  onPostUpdated={onPostUpdated}
                />
              </div>
            )}
          </div>
        </div>
        <div className="font-bold text-4xl text-white mb-2">
          {title}
        </div>
        <div className="font-medium text-lg text-white mb-2">
          {content.length > 200 ? `${content.slice(0, 200)}...` : content}
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
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export function MyPostsArray() {
  const [blogs, setBlogs] = useState<MyPostsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const handlePostDeleted = (deletedPostId) => {
    // Filter out the deleted post from the list
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== deletedPostId));
    setOpenIndex(null)
  };

  const handlePostUpdated = (updatedPostId : string, updatedData : string) => {
    // Update the post in the list with the updated data
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === updatedPostId ? { ...blog, ...updatedData } : blog
      )
    );
    setOpenIndex(null)
  };

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
              <MyPosts
                key={index}
                id={item.id}
                title={item.title}
                content={item.content}
                author={item.author.name}
                index={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                onPostDeleted={handlePostDeleted}   // Pass delete handler
                onPostUpdated={handlePostUpdated}   // Pass update handler
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

