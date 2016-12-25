import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import GroupMembers from '../components/GroupMembers.jsx';

export default class StudentSidebar extends BaseComponent {

    render() {
      const { user, users, groups } = this.props;
      const group = this.props.group;
        return (
            <div className="student-rightbar">
                <GroupMembers user={user} group={group} groups={groups} users={users}/>
            </div>
        )
    }
}
