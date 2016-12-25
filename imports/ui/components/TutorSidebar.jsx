import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import GroupMembers from '../components/GroupMembers.jsx';

export default class TutorSidebar extends BaseComponent {

    render() {
        const { user, users, groups } = this.props;
        const group = this.props.group;
        return (
            <div className="tutor-rightbar">
                <GroupMembers user={user} group={group} groups={groups} users={users}/>
                <div id="stats-section">
                    <h3>Your stats</h3>
                    <h4>Students</h4>
                    <h5>6</h5>
                    <h4>Tasks created</h4>
                    <h5>20</h5>
                    <h4>Completed by students</h4>
                    <h5>4</h5>
                    <h4>Completion rate</h4>
                    <h5>20%</h5>
                </div>
            </div>
        )
    }
}
