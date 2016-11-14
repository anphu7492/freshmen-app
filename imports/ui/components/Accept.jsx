import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';

export default class EventAcceptance extends React.Component {
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
        <div className="accept-reject">
        <button onClick = {this.updateState} className="btn btn-success"
              name="button" value="YES" id="accept" type="button">Accept</button>
        <div className="divider"/>
        <button onClick = {this.updateState} className="btn btn-danger"
              name="button" value="NO" id="decline" type="button">Reject</button>
        </div>
    );
}
}
