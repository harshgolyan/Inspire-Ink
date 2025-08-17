import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Skeleton from "./Skeleton";
import axios from "axios";
import Navbar from "./Navbar";
import { Ellipsis } from "lucide-react";
import EllipsePop from "./EllipsePop";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MyPostsProps = {
  id: string;
  title: string;
  content: string;
  author: string;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
  onPostDeleted: (id: string) => void;
  onPostUpdated: (id: string, updatedData: Partial<MyPostsData>) => void;
};

interface MyPostsData {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

const MyPosts = ({
  id,
  title,
  content,
  author,
  index,
  openIndex,
  setOpenIndex,
  onPostDeleted,
}: MyPostsProps) => {
  const isOpen = openIndex === index;

  const togglePopUp = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <div className="relative">
      <div className="h-auto w-[90vw] mx-5 border-b border-neutral-200 m-5 p-5 flex flex-col bg-secondary transform transition-transform duration-700 ease-out cursor-pointer">
        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-start items-center">
            <Avatar initials={author ? author[0].toUpperCase() : "U"} />
            <div className="text-primary font-medium pl-4">{author}</div>
          </div>

          <div className="relative">
            <div className="flex cursor-pointer" onClick={togglePopUp}>
              <Ellipsis color="#000" size={24} />
            </div>
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 z-20">
                <EllipsePop
                  postId={id}
                  onPostDeleted={onPostDeleted}
                  setOpenIndex={setOpenIndex}
                />
              </div>
            )}
          </div>
        </div>
        <div className="font-bold text-3xl text-primary mb-3">{title}</div>
        <div className="font-normal text-lg text-primary mb-3 prose max-w-none line-clamp-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
        <div className="mt-2 text-sm text-primary/70">
          Read time: {Math.ceil(content.length / 100)} minutes
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
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
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    blogsHandler();
  }, []);

  const handlePostDeleted = (deletedPostId: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== deletedPostId));
    setOpenIndex(null);
  };

  const handlePostUpdated = (updatedPostId: string, updatedData: Partial<MyPostsData>) => {
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === updatedPostId ? { ...blog, ...updatedData } : blog))
    );
    setOpenIndex(null);
  };

  return (
    <div className="bg-secondary min-h-screen">
      <Navbar />
      <div className="pt-[20vh] mx-[3%]">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => <Skeleton key={idx} />)
          : blogs.map((item, idx) => (
              <MyPosts
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                author={item.author.name}
                index={idx}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                onPostDeleted={handlePostDeleted}
                onPostUpdated={handlePostUpdated}
              />
            ))}
      </div>
    </div>
  );
}
