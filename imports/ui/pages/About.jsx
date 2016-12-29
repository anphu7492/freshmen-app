import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';


export default class About extends BaseComponent {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div id="about">
        &nbsp;
        <div className="about-content">
          <h1 id="about-title">&nbsp; &nbsp;About Freshmen Guide</h1>
          <p id="description">A Student , A Tutor , A Study Coordinator</p>
          &nbsp;
          <p id="content">
            <b>Freshmen Guide</b> &nbsp;
            is a service designed to relieve the stress of the orientation week on newly enrolled students. It aims at providing a one-stop solution to all the guidance a new student might need during the orientation week.</p>
        </div>
        &nbsp;
        <div className="contributors">
          <div id="abhishek">
            <img className="img-circle" src="https://res.cloudinary.com/aalto/image/upload/v1482946111/vz7gi3glpvougkfraeba.png" height="100px" width="100px"/>
            <h3>Abhishek Ramesh Shetty</h3>
            <h4>Master's Programme in ICT Innovation.</h4>
          </div>

          <div id="phu">
            <img className="img-circle" src="https://res.cloudinary.com/aalto/image/upload/v1482946111/vz7gi3glpvougkfraeba.png" height="100px" width="100px"/>
            <h3>Phu Pham</h3>
            <h4>Master's Programme in Computer Science.</h4>
          </div>

          <div id="kalai">
            <img className="img-circle" src="https://res.cloudinary.com/aalto/image/upload/v1482946111/vz7gi3glpvougkfraeba.png" height="100px" width="100px"/>
            <h3>Kalaiarasan Saminathan</h3>
            <h4>Master's Programme in Computer Science.</h4>
          </div>
        </div>
      </div>
    )
  }
}
