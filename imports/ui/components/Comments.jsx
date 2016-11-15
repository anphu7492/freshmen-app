import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';


export default class Comments extends React.Component {
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
      <div className="comments">
        <textarea cols="50" className="" placeholder="Enter a comment">

        </textarea>
        <button onClick = {this.updateState} className="post-button"
                name="button" value="OK" type="button">Post</button>
      </div>
    );
  }
}
