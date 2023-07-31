import React from 'react'
import Blog from '../components/blog/Blog'

const BlogPage = ({blogList}) => {
  return (
    <>
    <div><h1>All Blogs</h1></div>
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
      <Blog
      title={"Blog Heading"}
      content={"Blog Content"}
      />
    </>
  )
}

export default BlogPage