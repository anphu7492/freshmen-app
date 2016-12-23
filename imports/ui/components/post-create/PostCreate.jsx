import React from 'react';
import BaseComponent from '../BaseComponent.jsx';

import {

} from '../../../api/posts/methods';

export default class PostCreate extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      post: {
        type: 'simple'
      }
    });
    this.onPostCreate = this.onPostCreate.bind(this);
    this.onCreateTask = this.onCreateTask.bind(this);
    this.onCreateEvent = this.onCreateEvent.bind(this);
  }

  onPostCreate(event) {
    event.preventDefault();
    console.log(this.post);
  }

  onCreateTask() {
    if (this.post.type === 'task') {
      return;
    }
    this.post.type = 'task';
    this.post.event = null;
    this.post.task = {
      todos: [],
      assignees: [{}]
    }
  }

  onCreateEvent() {
    if (this.state.post.type === 'event') {
      return;
    }
    this.state.post.type = 'event';
    this.state.post.task = null;
    this.state.post.event = {}
  }

  renderTasksBox() {
    const { post } = this.state;

    return (
      <div className="post-task">
        task area
      </div>
    )
  }

  renderEventBox() {
    const { post } = this.state;

    return (
      <div className="post-event">
        event area
      </div>
    )
  }

  render() {
    const { post } = this.state;

    return (
      <div className="post-box">
        <form className="post-create" onSubmit={this.onPostCreate}>
          <textarea
            name="content"
            className="text form-control" ref={(c) => {post.content = c}}>
          </textarea>
          {post.type === 'task' ?
            this.renderTasksBox() :
            post.type === 'event' ? this.renderEventBox() : ''}
          <div className="post-types row">
            <div className="col-sm-10">
              <button className="btn" onClick={this.onCreateTask}>
                Task
              </button>
              <button className="btn" onClick={this.onCreateEvent}>
                Event
              </button>
            </div>
            <div className="col-sm-2">
              <button className="btn submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}