import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';

export default class UserInfo extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    let photo, facebook, twitter;
    if(user.profile.photo === "unset" || !user.profile.photo)
      photo = "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png";
    else
      photo = user.profile.photo;
    if(user.profile.facebook === "unset" || !user.profile.facebook)
      facebook = "none";
    else
      facebook = "inlineBlock";
    if(user.profile.twitter === "unset" || !user.profile.twitter)
      twitter = "none";
    else
      twitter = "inlineBlock";
    return (
      <div className="student">
        <p className="studenttitle"></p>
        <div className="student-image">
          <a href={"/profile/"+user._id}><img src={photo}
               height="80px" width="80px" alt="Avatar"/></a>
             <a href={"/profile/"+user._id}><p className="profile-name">{user.profile.name}</p></a>
          <p className="profile-school">{user.profile.major}</p>
          <p className="profile-school">{user.profile.school}</p>
          <a style={{display: facebook}} href={user.profile.facebook}>
            <img src="https://res.cloudinary.com/aalto/image/upload/v1483025260/w63j3xs6928tkt692eqm.png"
                 height="40px" width="40px" alt="Facebook" target="_blank"/>
          </a>
          <a style={{display: twitter}} href={user.profile.twitter}>
            <img src="https://res.cloudinary.com/aalto/image/upload/v1483025418/pvrfhrqnlhynruqrdndz.png"
                 height="38px" width="38px" alt="Twitter" target="_blank"/>
          </a>
        </div>
      </div>
    );

  }

}

UserInfo.propTypes = {
  user: React.PropTypes.object
};
