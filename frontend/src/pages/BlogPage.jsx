import React from 'react';
import Blog from '../components/learn/blog/Blog';
import { BlogData } from '../data/blogData';
import './BlogPage.css';

const BlogPage = ({ blogList }) => {
  return (
    <div className="blog-page container main">
      <h1 className="page-title fw-bold fs-1" style={{ letterSpacing: 3 }}>
        All Blogs
      </h1>
      <div className="blog-list">
        {BlogData.map((b, index) => (
          <Blog key={index} title={b.title} content={b.content} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
