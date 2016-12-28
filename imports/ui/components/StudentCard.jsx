import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from './BaseComponent.jsx';

export default class StudentCard extends BaseComponent{
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="student-card">
        <a href={"/profile/"+user._id}>
          <img src={user.profile.photo} alt="avatar" />
          <p>{user.profile.name}</p>
        </a>
      </div>
    );
  }
}

StudentCard.propTypes = {
  user: React.PropTypes.object
};