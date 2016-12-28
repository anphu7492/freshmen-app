import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import { displayError } from '../../helpers/errors.js';

import {
  markTaskCompletion
} from '../../../api/posts/methods.js';

export default class Task extends BaseComponent {
  constructor(props) {
    super(props);
    this.markCompleted = this.markCompleted.bind(this);
    this.markIncompleted = this.markIncompleted.bind(this);
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
    const myStatus = post.task.assignees.find(assignee => (assignee.user === Meteor.userId()));
    let toggleBtn;
    if (myStatus && myStatus.status === 'completed') {
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
      </div>
    );
  }
}

Task.propTypes = {
  post: React.PropTypes.object
};