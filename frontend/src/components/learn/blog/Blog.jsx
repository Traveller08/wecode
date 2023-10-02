import React from 'react';
import './Blog.css';

const Blog = ({ title, content }) => {
  return (
    <div className="blog-card">
      <div className="blog-header ">
        <h4 className="mb-2" style={{ height: '87px' }}>
          {title.length <= 35 ? title : title.slice(0, 35)}...
        </h4>
      </div>

      <a href={content} target="_blank" rel="noopener noreferrer">
        <button
          type="submit"
          className="bg-primary rounded text-white border-0 fw-bold"
        >
          Read More
        </button>
      </a>
    </div>
  );
};

export default Blog;
