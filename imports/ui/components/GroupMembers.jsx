import React from 'react';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import { Groups } from '../../api/groups/groups.js';

export default class GroupMembers extends BaseComponent {

    render() {
        const { user, users, groups } = this.props;
        const groupid = this.props.group;
        //var users = Meteor.users.find().fetch();

        var members = users.filter(function( obj ) {
        return obj.group == groupid && obj.role!="tutor";
        });
        console.log(members);
        var Cardlist = [];
        for (var i=0; i < members.length; i++){
          Cardlist.push(<StudentCard key={i} id={members[i]._id} photo={members[i].profile.photo} name={members[i].profile.name}/>);
        }

        //const groups = Groups.find().fetch();
        var group = groups.filter(function( obj ) {
        return obj._id == groupid;
        });
        const groupname = group[0].name;
        console.log(groupname);



        return (
            <div className="tutor-rightbar">
                <h3>{groupname}</h3>
                <div id="group-section">

                    {Cardlist}
                </div>

            </div>
        )
    }
}
