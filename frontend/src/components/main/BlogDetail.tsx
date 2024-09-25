import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../Skeleton';
import Navbar from '../Navbar';
import Avatar from '../Avatar';

interface BlogData {
  title: string;
  content: string;
  author: {
    name: string;
  };
}

function BlogDetail() {
  const { id } = useParams<{ id: string }>();  // Get the blog post ID from the URL
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

  if (loading) {
    return <Skeleton />;
  }

  if (!blog) {
    return <div className="text-white">Blog post not found</div>;
  }

  return (
        <div className="bg-slate-800 min-h-screen">
            <Navbar />
            <div className='pt-[20vh] mx-[3%]'>
                <div className="h-auto w-[90vw] mx-5 rounded-lg border m-5 p-3 flex flex-col bg-slate-700">
                    <div className="flex items-center mb-3">
                        <div>
                            <Avatar initials={blog.author ? blog.author.name[0].toUpperCase() : "N/A"} />
                        </div>
                        <div className="text-white font-thin pl-4">
                            {blog.author.name || "Unknown Author"}
                        </div>
                    </div>
                    <div className="font-bold text-4xl text-white mb-2">
                        {blog.title}
                    </div>
                    <div className="font-medium text-lg text-white mb-2">
                        {blog.content}
                    </div>
                    <div className="mt-auto text-white">
                        Read time: {Math.ceil(blog.content.length / 100)} minutes
                    </div>
                </div>
            </div>
        </div>
  );
}
export default BlogDetail;
