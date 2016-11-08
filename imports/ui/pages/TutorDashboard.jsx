import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';

export default class TutorDashboard extends React.Component {
  render() {
    return (
      <div className="tutor-dashboard">
        <h1>This is the tutor-dashboard!</h1>
      </div>
    );
  }
}
