import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../Skeleton";
import Navbar from "../Navbar";
import Avatar from "../Avatar";

interface BlogData {
  title: string;
  content: string;
  author: {
    name: string;
  };
}

function BlogDetail() {
  const { id } = useParams<{ id: string }>(); 
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://backend.harshgolyan308.workers.dev/api/v1/blog/get-blog/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="bg-secondary min-h-screen">
      <Navbar />
      <div className="pt-[10vh] mx-[3%]">
        {loading ? (
          <Skeleton />
        ) : blog ? (
          <div className="w-full mx-auto p-6 border-b shadow-neutral-200">
            <div className="flex items-center mb-4">
              <Avatar initials={blog.author?.name[0].toUpperCase() || "U"} />
              <div className="text-primary font-medium pl-4">
                {blog.author?.name || "Unknown Author"}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">
              {blog.title}
            </h1>
            <p className="text-lg text-primary mb-6">{blog.content}</p>
          </div>
        ) : (
          <div className="text-primary text-center">Blog post not found</div>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
