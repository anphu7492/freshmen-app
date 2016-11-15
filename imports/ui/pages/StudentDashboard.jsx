import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Tasks from '../components/Tasks.jsx'
import Events from '../components/Events.jsx'

export default class StudentDashboard extends React.Component {
      render() {
        return (
            <div className="student-view">
              <Tasks/>
              <Events/>
            </div>
         );
      }
}
