import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';


export default class About extends BaseComponent {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div id="about">

        <div className="about-content">
          <h1 id="about-title">Freshmen Guide</h1>
          <p id="description">No more orientation week woes!</p>

          <p id="content">
            <b>Freshmen Guide</b> is a service designed to relieve the stress of the orientation week on newly enrolled students. It aims at providing a one-stop solution to all the guidance a new student might need during the orientation week. It combines the advantanges of having a real tutor with the utility of technology.</p>
        </div>

        <div className="contributors">
          <div className="person">
            <img className="img-circle" src="https://res.cloudinary.com/aalto/image/upload/v1482610930/frrn9j1xarpvsr5akjxx.jpg" height="100px" width="100px"/>
            <h3>Abhishek Ramesh Shetty</h3>
            <h4>Master's Programme in ICT Innovation.</h4>
          </div>

          <div className="person">
            <img className="img-circle" src="https://res.cloudinary.com/aalto/image/upload/v1483099803/default/phu.jpg" height="100px" width="100px"/>
            <h3>Phu Pham</h3>
            <h4>Master's Programme in Computer Science.</h4>
          </div>

          <div className="person">
            <img className="img-circle" src="https://res.cloudinary.com/aalto/image/upload/v1483100384/IMG_20161202_112017_irr1t1.jpg" height="100px" width="100px"/>
            <h3>Kalaiarasan Saminathan</h3>
            <h4>Master's Programme in Computer Science.</h4>
          </div>
        </div>
      </div>
    )
  }
}
