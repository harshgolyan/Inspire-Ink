import { useState, useEffect, useRef } from "react";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

interface BlogProps {
  id: string;
  title: string;
  content: string;
  author: string;
}

const Blog = ({ id, title, content, author }: BlogProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const blogRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    if (blogRef.current) {
      observer.observe(blogRef.current);
    }

    return () => {
      if (blogRef.current) {
        observer.unobserve(blogRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={blogRef}
      className={`h-auto w-[90vw] mx-5 border-b p-5 flex flex-col bg-secondary transform transition-transform duration-700 ease-out cursor-pointer ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="flex items-center mb-3">
        <Avatar initials={author ? author[0].toUpperCase() : "N/A"} />
        <div className="text-primary font-medium pl-4">{author || "Unknown Author"}</div>
      </div>
      <div className="font-bold text-3xl text-primary mb-2">{title}</div>
      <div className="font-normal text-lg text-primary mb-2">
        {content.length > 200 ? `${content.substr(0, 200)}...` : content}
      </div>
      <div className="mt-2 text-sm text-primary/70">
        Read time: {Math.ceil(content.length / 100)} minutes
      </div>
      <Link to={`/blog/${id}`} className="mt-4">
        <button className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary transition">
          Read More
        </button>
      </Link>
    </div>
  );
};

export default Blog;
