import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';

export default class GroupMembers extends BaseComponent {

    render() {
        return (
            <div className="tutor-rightbar">
                <div id="group-section">
                    <StudentCard name="Butters"/>
                    <StudentCard name="Stan"/>
                    <StudentCard name="Kyle"/>
                    <StudentCard name="Jimmy"/>
                    <StudentCard name="Kenny"/>
                    <StudentCard name="Eric"/>
                </div>
                <br/>
            </div>
        )
    }
}
