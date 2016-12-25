import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import { Groups } from '../../api/groups/groups.js';

export default class Tutor extends React.Component {
constructor(props){
  super(props);
  this.getTutor = this.getTutor.bind(this);
}

    getTutor(groups, users, id){
      var userObj = users.filter(function( obj ) {
      return obj._id == id;
    });
    var group = userObj[0].group;
    var userObj2 = users.filter(function( obj ) {
    return obj.group == group && obj.role=="tutor";
  });


    return userObj2[0];

    }

componentWillReceiveProps({loading, groups}){

}

    render() {
      const groups = Groups.find().fetch();

    if (Meteor.user() && Meteor.user().role === 'student'){
      var users = Meteor.users.find().fetch();

      var tutor = this.getTutor(groups, users, Meteor.userId());
      //console.log(tutor);
      if (tutor){
      if(tutor.profile.photo === "unset" || !tutor.profile.photo)
        var photo = "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png";
      else
        var photo = tutor.profile.photo;
      if(tutor.profile.facebook === "unset" || !tutor.profile.facebook)
        var facebook = "none";
      else
        var facebook = "inlineBlock";
      if(tutor.profile.twitter === "unset" || !tutor.profile.twitter)
        var twitter = "none";
      else
        var twitter = "inlineBlock";
      var tutorProfile = "/profile/" + tutor._id;
        return (
            <div className="student">
            <p className="tutortitle">Tutor info</p>
                <div className="student-image">
                <a href={tutorProfile}> <img src={photo}
                     height="80px" width="80px" alt="Tutor Image"/> </a>
                   <p className="profile-name">Tutor</p>
                     <p className="profile-school">{tutor.profile.major}</p>
                     <p className="profile-school">{tutor.profile.school}</p>
                     <a style={{display: facebook}} href={tutor.profile.facebook}><img src="https://www.seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview.png"
                               height="40px" width="40px" alt="Facebook" target="_blank"/></a>
                             <a style={{display: twitter}} href={tutor.profile.twitter}><img src="https://www.seeklogo.net/wp-content/uploads/2015/09/twitter-icon-circle-logo.png"
                               height="38px" width="38px" alt="Twitter" target="_blank"/></a>
                </div>
            </div>
        );
      }
      else return (
          <div>
          </div>
      );
  }

    return (
        <div>
        </div>
    );

    }
}
