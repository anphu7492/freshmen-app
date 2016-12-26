import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import GroupMembers from '../components/GroupMembers.jsx';
import { Posts } from '../../api/posts/posts.js';
export default class TutorSidebar extends BaseComponent {

    render() {
        const { user, users, groups, tasks } = this.props;
        const group = this.props.group;
        var members = users.filter(function( obj ) {
        return obj.group == group && obj.role!="tutor";
        });

        //const tasks = Posts.find({type: "task", creator: Meteor.userId()}).fetch(); //posts relavant to current user (all events and posts, tasks created by user)
        /*var tasks = posts.filter(function( obj ) {
        return obj.type == "task";
        });*/
        var numTasks = tasks.length;
        var completedTasks = 0;
        var completionRate = 0;
        /*for (var i=0; i< numTasks; i++ )
        {
            let status = tasks[i].task.assignees.$.status;
            for (varj=0; j< status.length; j++){
              if (status[j] == "completed")
                completedTasks++;
            }
        }*/
        if (completedTasks != 0){
          completionRate = (completedTasks * 100)/(numTasks * members.length)
        }


        return (
            <div className="tutor-rightbar">
                <GroupMembers user={user} group={group} groups={groups} users={users}/>
                <div id="stats-section">
                    <h3>Your stats</h3>
                    <h4>Students</h4>
                    <h5>{members.length}</h5>
                    <h4>Tasks created</h4>
                    <h5>{numTasks}</h5>
                    <h4>Completed by students</h4>
                    <h5>{completedTasks}</h5>
                    <h4>Completion rate</h4>
                    <h5>{completionRate}</h5>
                </div>
            </div>
        )
    }
}
