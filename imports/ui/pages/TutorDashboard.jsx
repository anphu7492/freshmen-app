import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import StudentCard from '../components/StudentCard.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
import { GoogleMap, Marker, SearchBox } from "react-google-maps";
import $ from "jquery";
import Posts from '../../api/posts/posts.js'

export default class TutorDashboard extends BaseComponent {
  constructor(props) {
    super(props);
  }

  taskFormFunc() {
    $('.taskForm').css('display', 'block');
    $('.eventForm').css('display', 'none');
    $('.postForm').css('display', 'none');
    $('#map-picker').locationpicker();
  }

  eventFormFunc() {
    $('.taskForm').css('display', 'none');
    $('.eventForm').css('display', 'block');
    $('.postForm').css('display', 'none');
  }

  postFormFunc() {
    $('.taskForm').css('display', 'none');
    $('.eventForm').css('display', 'none');
    $('.postForm').css('display', 'block');
  }

  insertPosts(e) {
    Posts.insert(e.text);
  }

  render() {
    const user = this.props;

    return (

      <div className="tutor-dashboard">
       <div className ="tutor-main">
      {/*     <form className="createTask">
            Task name -
            <input type="text" name="taskname" /><br />
            Steps -
            <input type="text" name="steps" /><br />
            Documents required -
            <input type="text" name="docs" /><br />
            <input type="submit" value="Submit" />
          </form>
        */}

<button className="btn btn-success" onClick={this.taskFormFunc}>Create Task</button>
<button className="btn btn-info" onClick={this.eventFormFunc}>Create Event</button>
<button className="btn btn-warning" onClick={this.postFormFunc}>Create Post</button>

      <form className="taskForm">
          <h4>Create a task</h4>
  <div className="form-group">
    <input type="text" className="form-control" id="taskName" placeholder="Enter a name" />

  </div>
  <div className="form-group">
    <input type="text" className="form-control" id="steps" placeholder="Steps" />
      </div>
  <div className="form-group">
    <input type="text" className="form-control" id="docs" placeholder="Documents required" />
  </div>


<button type="submit" className="btn btn-primary">Create task</button>
</form>

<form className="eventForm">
    <h4>Create an Event</h4>
<div className="form-group">
<input type="text" className="form-control" id="eventName" placeholder="Enter a name" />

</div>
<div className="form-group">
<input type="date" className="form-control" id="date" placeholder="When?" />
</div>
<div className="form-group">
<input type="text" className="form-control" id="where" placeholder="Where?" />
</div>
<button type="submit" className="btn btn-primary">Create event</button>
</form>

<form className="postForm" onSubmit={this.insertPosts}>
    <h4>Create a post</h4>
<div className="form-group">
<input type="text" className="form-control input-lg" id="post" placeholder="What's up?" />
</div>
<button type="submit" className="btn btn-primary">Post</button>
</form>





</div>

      <div className="tutor-rightbar">
        <div id = "group-section">
          <h3 id ="groupName">Your group</h3>
          <StudentCard name="Shek"/>
          <StudentCard name="Bake"/>
          <StudentCard name="Shek"/>
          <StudentCard name="Bake"/>
          <StudentCard name="Shek"/>
          <StudentCard name="Bake"/>
        </div>
        <br />
        <div id = "stats-section">
          <h3>Your stats</h3>
          <h4>Students</h4>
          <h5>6</h5>
          <h4>Tasks created</h4>
          <h5>20</h5>
          <h4>Completed by students</h4>
          <h5>4</h5>
          <h4>Completion rate</h4>
          <h5>20%</h5>
        </div>
      </div>
    </div>
    );
  }
}

TutorDashboard.propTypes = {
  user: React.PropTypes.object,
};
