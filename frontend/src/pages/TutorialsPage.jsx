import React from 'react';
import '../components/row/Row';
import Row from '../components/row/Row';
import { tutorials } from '../data/tutorial';

const TutorialsPage = () => {
  return (
    <>
      {tutorials.map(t => {
        return (
          <Row 
          title={t.title}
          linkArray={t.linkArray}
          />
        )
      })}
    </>
  )
}

export default TutorialsPage;