import React, { useState, useEffect, useRef } from "react";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

interface BlogProps {
    id :string,
    title: string,
    content: string,
    author: string,
}

const Blog = ({ id, title, content, author } : BlogProps) => {
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
      className={`h-auto w-[90vw] mx-5 rounded-lg border m-5 p-3 flex flex-col bg-slate-700 transform transition-transform duration-700 ease-out cursor-pointer ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="flex items-center mb-3">
        <div>
          <Avatar initials={author ? author[0].toUpperCase() : "N/A"} />
        </div>
        <div className="text-white font-thin pl-4">{author || "Unknown Author"}</div>
      </div>
      <div className="font-bold text-4xl text-white mb-2">{title}</div>
      <div className="font-medium text-lg text-white mb-2">
        {content.length > 200 ? `${content.substr(0, 200)}...` : content}
      </div>
      <div className="mt-auto text-white">Read time: {Math.ceil(content.length / 100)} minutes</div>
      <Link to={`/blog/${id}`}>
        <button className="mt-4 bg-blue-500 p-2 rounded-lg text-white">Read More</button>
      </Link>
    </div>
  );
};

export default Blog;
