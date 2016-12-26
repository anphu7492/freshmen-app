import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Comments from '../components/Comments.jsx';
import Locator from '../components/Locator.jsx';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: 'Initial data...'
    };

    this.updateState = this.updateState.bind(this);
  };

  updateState(e) {
    this.setState({data: 'Data updated...'})
  }

  render() {
    /*
    var id = Meteor.userId();
    const { post, users } = this.props;
    const postUser = users.filter(function( obj ) {
    return obj._id == post.creator;
  });
    const userName = postUser[0].profile.name;
    const userPhoto = postUser[0].profile.photo;
    const userId = postUser[0]._id;
    const userProfile = "/profile/" + userId;
    var postDate = new Date(post.createdAt);
    var deletable = "none";
    if(id==userId){
      deletable = "block";
    }
*/
    return (
      <div className="tasks">

        {/*  <a href={userProfile}><img src={userPhoto} alt={userName}/></a>
          <a href={userProfile}><h4>{userName} said:</h4></a>
          <button style={{display: deletable}} className="btn btn-danger" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash"></span></button>
*/}
        <p className="eventtitle">Register at AYY - Deadline 01 September 2017
        </p>
        <p className="inlinetitle">Tutor Instructions </p>
        <p className="instructions">
          1. Collect below documents<br />
          2. Go to Ayy office<br />
          3. Pay union fees.

        </p>
        <p className="inlinetitle">Required documents</p>
        <p className="instructions">Letter of Admission, Passport, RP card </p>
        <div className="event-location">
          <p className="inlinetitle">Where?</p>
          <div className="mapdiv">
            <Locator address="Kilonkallio 10, Finland"/>
          </div>
        </div>
        <button onClick = {this.updateState} className="btn-success close-button"
                name="button" value="OK" type="button">Mark as Completed</button>

        <Comments />
      </div>
    );
  }
}
