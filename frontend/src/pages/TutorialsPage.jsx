// import React from 'react';
// import '../components/row/Row';
// import Row from '../components/row/Row';
// import { tutorials } from '../data/tutorial';

// const TutorialsPage = () => {
//   return (
//     <>
//       {tutorials.map(t => {
//         return (
//           <Row 
//           title={t.title}
//           linkArray={t.linkArray}
//           />
//         )
//       })}
//     </>
//   )
// }

// export default TutorialsPage;

import React from 'react';
import '../components/row/Row';
import Row from '../components/row/Row';
import { tutorials } from '../data/tutorial';
import './TutorialsPage.css';

const TutorialsPage = () => {
  return (
    <div className="tutorials-page">
      {tutorials.map((t, index) => (
        <Row key={index} title={t.title} linkArray={t.linkArray} />
      ))}
    </div>
  );
};

export default TutorialsPage;
