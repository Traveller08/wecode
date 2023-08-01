import React, { useEffect, useState } from 'react';
import '../components/learn/blogs/Blog.css'; // Add your CSS file here
import {data as blogsByTopic} from "../data/BlogsData";
const BlogPage = () => {
  

  return (
    <div className="blog-container">
      <h1>DSA Blogs</h1>
      {Object.entries(blogsByTopic).map(([topic, blogs]) => (
        <div key={topic} className="topic-section">
          <h2>{topic}</h2>
          <div className="blog-list">
            {blogs.slice(0, 5).map((blog) => (
              <div key={blog.id} className="blog-card">
                <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                <div className="blog-details">
                  <h3>{blog.title}</h3>
                  <p className="blog-meta">
                    By {blog.author} | {blog.date}
                  </p>
                  <p className="blog-content">{blog.content}</p>
                  {/* Add read more link or button */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
