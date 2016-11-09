import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';

export default class StudentView extends React.Component {
  render() {
    return (
      <div className="student-view">
      <p> Student view </p>
     </div>
    );
  }
}
