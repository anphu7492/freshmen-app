import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Tasks from '../components/Tasks.jsx';
import Events from '../components/Events.jsx';
import Posts from '../components/Posts.jsx';

export default class StudentDashboard extends React.Component {
      render() {
        return (
            <div className="student-view">
              <div>
              <form className="posForm">
                <h4>Create a post</h4>
                <div className="form-group">
                  <input type="text" className="form-control input-lg" id="post" placeholder="What's up?" />
                </div>
                <button type="submit" className="btn btn-success">Post</button>
              </form>
              </div>
              <Tasks/>
              <Posts name="Bake" />
              <Events/>
            </div>
         );
      }
}
