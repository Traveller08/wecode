import React from 'react'
import './Blog.css'

const Blog = ({title, content}) => {
  return (
    <div className='card lf-s blog' style={{border: "none"}}>
        <div className="card-header">
            {title}
      </div>
      <div className='card-body'>
        {content}
      </div>
    </div>
  )
}

export default Blog