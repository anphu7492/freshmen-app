import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import GroupMembers from '../components/GroupMembers.jsx';

export default class StudentSidebar extends BaseComponent {

    render() {
        return (
            <div className="student-rightbar">
                <GroupMembers/>
            </div>
        )
    }
}
