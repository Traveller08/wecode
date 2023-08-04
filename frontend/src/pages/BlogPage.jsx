import React from 'react'
import Blog from '../components/learn/blog/Blog'
import {BlogData} from "../data/blogData";

const BlogPage = ({blogList}) => {
  return (
    <>
    <div style={{textAlign: "center"}}><h1>All Blogs</h1></div>
      {/* Uncomment this when you have data in blogdata page  */}
      {/* {
        blogList.map(b => {
          return (
            <Blog
              title={b.title}
              content={b.content} 
            />
          )
        })
      } */}
      {/* Remove blog tag below*/}
      {BlogData.map(b => {
          return (
            <Blog
            title={b.title}
            content={b.content} 
            />
      )})
      }
    </>
  )
}

export default BlogPage