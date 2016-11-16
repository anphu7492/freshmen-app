import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Student from '../components/Student.jsx';
import Tutor from '../components/Tutor.jsx';

export default class Profiles extends React.Component {
render() {
    return (
        <div className="profiles">
        <Student/>
        <br/>
        <Tutor/>
        </div>
    );
  }
}
