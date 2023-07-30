import React from 'react'
import './Row.css'

const Row = ({title, linkArray}) => {
  return (
    <div className='row'>
        <div className='row_header'>{title}</div>
        <div className='row_posters'>
            {linkArray.map(c => {
               return (
                <div className='row_poster'>
                    <iframe key={c.id} src={c.src} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
               </div> 
               )
            })}
        </div>
    </div>
  )
}

export default Row