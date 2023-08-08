import React from "react";
import "./Blog.css";

const Blog = ({ title, content }) => {
  return (
    <div className="blog-card">
      <div className="blog-header">
        <b>{title}</b>
      </div>
      <div className="blog-content">
        <a href={content} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default Blog;
