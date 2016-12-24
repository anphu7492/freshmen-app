import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    console.log("in cons"+ user);
  /*  var id = Meteor.userId();
    var userss = Meteor.users.find().fetch();
    var user = userss.filter(function( obj ) {
    return obj._id == id;
  });
    */


}

componentWillMount(){

}

    render() {
      if (Meteor.user()){

        var user = Meteor.user();
        console.log(user);

        if(user.profile.photo === "unset" || !user.profile.photo)
          var photo = "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png";
        else
          var photo = user.profile.photo;
        if(user.profile.facebook === "unset" || !user.profile.facebook)
          var facebook = "none";
        else
          var facebook = "inlineBlock";
        if(user.profile.twitter === "unset" || !user.profile.twitter)
          var twitter = "none";
        else
          var twitter = "inlineBlock";
        return (
            <div className="student">
            <p className="studenttitle">Hello!</p>
                <div className="student-image">
                    <img src={photo}
                         height="80px" width="80px" alt="Student Image"/>
                    <p className="profile-name">{user.profile.name}</p>
                    <p className="profile-school">{user.profile.major}</p>
                    <p className="profile-school">{user.profile.school}</p>
                    <a style={{display: facebook}} href={user.profile.facebook}><img src="https://www.seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview.png"
                              height="40px" width="40px" alt="Facebook" target="_blank"/></a>
                            <a style={{display: twitter}} href={user.profile.twitter}><img src="https://www.seeklogo.net/wp-content/uploads/2015/09/twitter-icon-circle-logo.png"
                              height="38px" width="38px" alt="Twitter" target="_blank"/></a>
                </div>
            </div>
        );
        }
        else  return (
            <div>
            </div>
        );
    }

}
