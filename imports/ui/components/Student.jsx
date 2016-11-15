import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    }

    render() {
      if (Meteor.user()){
        var user = Meteor.user();
        return (
            <div className="student">
            <p className="studenttitle">Hello!</p>
                <div className="student-image">
                    <img src="https://upload.wikimedia.org/wikipedia/en/7/77/EricCartman.png"
                         height="80px" width="80px" alt="Student Image"/>
                    <p className="profile-name">{user.profile.name}</p>
                    <p className="profile-school">{user.profile.major}</p>
                    <p className="profile-school">{user.profile.school}</p>
                    <a href="#"><img src="https://www.seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview.png"
                              height="40px" width="40px" alt="Facebook"/></a>
                    <a href="#"><img src="https://www.seeklogo.net/wp-content/uploads/2015/09/twitter-icon-circle-logo.png"
                              height="38px" width="38px" alt="Twitter"/></a>
                </div>
            </div>
        );
        }
        return (
            <div>
            </div>
        );
    }
}
