import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import GroupMembers from '../components/GroupMembers.jsx';

export default class StudentSidebar extends BaseComponent {

  render() {
    const { user } = this.props;
    return (
      <div className="student-rightbar">
        <GroupMembers user={user}/>
      </div>
    );
  }
}
