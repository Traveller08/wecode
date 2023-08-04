import React from 'react'
import './Blog.css'

const Blog = ({title, content}) => {
  return (
    <div className='card lf-s blog' style={{border: "none"}}>
        <div className="card-header">
            <b>{title}</b>
      </div>
      <div className='card-body'>
        <a href={content}>{content}</a>
      </div>
    </div>
  )
}

export default Blog