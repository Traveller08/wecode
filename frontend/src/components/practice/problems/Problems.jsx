import React from 'react';
import './problems.css';
import ProblemCard from './ProblemCard';
const Problems = (props) => {
  console.log(props)
  return (
    <div className='p-container'>
      {
        props.problems.map((problem)=>{
          return <ProblemCard problem={problem}/>
        })
      }
     

    </div>
  )
}

export default Problems;