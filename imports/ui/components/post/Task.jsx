import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import { displayError } from '../../helpers/errors.js';

import {
  markTaskCompletion
} from '../../../api/posts/methods.js';
import { Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

export default class Task extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.showTaskModal = false;
    this.state.completedBy = [];
    this.state.notCompletedBy = [];
    this.markCompleted = this.markCompleted.bind(this);
    this.markIncompleted = this.markIncompleted.bind(this);
    this.showTaskModal = this.showTaskModal.bind(this);
    this.hideTaskModal = this.hideTaskModal.bind(this);
  }

  showTaskModal(task){
    this.setState({showTaskModal: true});
    var completedBy = [];
    var notCompletedBy = [];
    for (var i=0; i < task.assignees.length; i++){
      if (task.assignees[i].status ==="completed"){
        let user = Meteor.users.findOne(task.assignees[i].user);
        completedBy.push(
          <OverlayTrigger placement="top" key={user._id} overlay={<Tooltip id="tooltip">{user.profile.name}</Tooltip>}>
          <a href={"/profile/" + user._id}><img className="event-attendee-pic" src={user.profile.photo} /></a>
          </OverlayTrigger>
        );
      }
      else{
        let user = Meteor.users.findOne(task.assignees[i].user);
        notCompletedBy.push(
          <OverlayTrigger placement="top" key={user._id} overlay={<Tooltip id="tooltip">{user.profile.name}</Tooltip>}>
          <a href={"/profile/" + user._id}><img className="event-attendee-pic" src={user.profile.photo} /></a>
          </OverlayTrigger>
        );
      }
    }
    this.setState({
      completedBy: completedBy,
      notCompletedBy: notCompletedBy
    });


  }

  hideTaskModal(){
    this.setState({showTaskModal: false});
  }

  markCompleted() {
    markTaskCompletion.call({
      postId: this.props.post._id,
      status: 'completed'
    }, displayError)
  }

  markIncompleted() {
    markTaskCompletion.call({
      postId: this.props.post._id,
      status: 'ongoing'
    }, displayError)
  }

  render(){
    const { post } = this.props;
    const todos = post.task.todos;
    const user = Meteor.user();
    console.log(user);
    const myStatus = post.task.assignees.find(assignee => (assignee.user === Meteor.userId()));
    var numCompleted = post.task.assignees.filter(assignee => (assignee.status === "completed")).length;
    var numOngoing = post.task.assignees.length - numCompleted;
    let toggleBtn;
    if(user.role==="tutor" || user.role ==="coordinator"){
      toggleBtn = (
        <button className="task-info" onClick={ () => this.showTaskModal(post.task)}>
          {numCompleted} completed - {numOngoing} ongoing
        </button>
      )
    }
    else if (myStatus && myStatus.status === 'completed') {
      toggleBtn = (
        <button className="custom-btn-success" onClick={this.markIncompleted}>
          Completed
        </button>
      )
    } else {
      toggleBtn = (
        <button className="custom-btn-success" onClick={this.markCompleted}>
          Mark as complete
        </button>
      )
    }
    let Todos = [];
    for (let i=0; i< todos.length; i++) {
      Todos.push(<li key={todos[i]._id}>{i+1}. {todos[i].text}.</li>);
    }

    return (
      <div className="Task">
        <ul className="todo-list">
          {Todos}
        </ul>
        {toggleBtn}

        <Modal
          show={this.state.showTaskModal}
          onHide={this.hideTaskModal}>

          <Modal.Header closeButton>
            <Modal.Title>Task status for {post.text}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div id="event-attendees">
            <p>Completed by: {numCompleted}</p>
            {this.state.completedBy}
            <p>Ongoing: {numOngoing}</p>
            {this.state.notCompletedBy}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hideTaskModal}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

Task.propTypes = {
  post: React.PropTypes.object
};
