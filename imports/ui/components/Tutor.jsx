import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';

export default class Tutor extends React.Component {
    render() {
    if (Meteor.user() && Meteor.user().role === 'student'){
      var user = Meteor.user();
        return (
            <div className="student">
            <p className="tutortitle">Tutor info</p>
                <div className="tutor-image">
                <img src="https://upload.wikimedia.org/wikipedia/en/7/77/EricCartman.png"
                     height="80px" width="80px" alt="Tutor Image"/>
                   <p className="profile-name">Tutor</p>
                     <p className="profile-school">{user.profile.major}</p>
                     <p className="profile-school">{user.profile.school}</p>
                     <img src="https://www.seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview.png"
                               height="40px" width="40px" alt="Facebook"/>
                     <img src="https://www.seeklogo.net/wp-content/uploads/2015/09/twitter-icon-circle-logo.png"
                               height="38px" width="38px" alt="Twitter"/>
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
