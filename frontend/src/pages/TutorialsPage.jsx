import React from 'react';
import '../components/row/Row';
import Row from '../components/row/Row';

const TutorialsPage = () => {
  return (
    <>
      <Row
        title={"Binary Tree"}
        linkArray={[{ id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 2, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 3, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }]} 
      />
      <Row
        title={"Array"}
        linkArray={[{ id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }]} 
      />
      <Row
        title={"DP"}
        linkArray={[{ id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }, { id: 1, src: "https://www.youtube.com/embed/nqowUJzG-iM" }]} 
      />
    </>
  )
}

export default TutorialsPage;