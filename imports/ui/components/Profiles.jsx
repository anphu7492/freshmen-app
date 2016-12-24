import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Student from '../components/Student.jsx';
import Tutor from '../components/Tutor.jsx';
import { Groups } from '../../api/groups/groups.js';

export default class Profiles extends React.Component {
constructor(props){
  super(props);

}


render() {

  const {user} = this.props;
    return (
        <div className="profiles">
        <Student user={user}/>
        <br/>
        <Tutor/>
        </div>
    );
  }
}
