import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Comments from '../components/Comments.jsx';

export default class Tasks extends React.Component {
constructor(props) {
super(props);

this.state = {
data: 'Initial data...'
}

this.updateState = this.updateState.bind(this);
};

updateState(e) {
this.setState({data: 'Data updated...'})
}
    render() {
        return (
            <div className="tasks">
                  <p className="eventtitle">Register at AYY - Deadline 01 September 2017
                  <button onClick = {this.updateState} className="close-button"
                  name="button" value="OK" type="button">Mark as Completed</button>
                  </p>
                  <p className="inlinetitle">Tutor Instructions </p>
                  <p className="instructions">The new name of the Aalto University Learning Centre is Harald Herlin Learning Centre.
                  The name was published at the opening event on 4 November.
                  The Harald Herlin Learning Centre was opened after a renovation on Monday 30 October.
                  </p>
                  <p className="inlinetitle">Required documents</p>
                  <p className="instructions">Letter of Admission, Passport, RP card </p>
                  <div className="event-location">
                  </div>
                  <Comments/>
            </div>
        );
    }
}
