import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';

export default class TutorSidebar extends BaseComponent {

  render() {
    return (
      <div className="tutor-rightbar">
        <div id = "group-section">
          <h3 id ="groupName">Your group</h3>
          <StudentCard name="Butters"/>
          <StudentCard name="Stan"/>
          <StudentCard name="Kyle"/>
          <StudentCard name="Jimmy"/>
          <StudentCard name="Kenny"/>
          <StudentCard name="Eric"/>
        </div>
        <br />
        <div id = "stats-section">
          <h3>Your stats</h3>
          <h4>Students</h4>
          <h5>6</h5>
          <h4>Tasks created</h4>
          <h5>20</h5>
          <h4>Completed by students</h4>
          <h5>4</h5>
          <h4>Completion rate</h4>
          <h5>20%</h5>
        </div>
      </div>
    )
  }
}
