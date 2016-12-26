import React from 'react';
import { Random } from 'meteor/random';
import BaseComponent from '../BaseComponent.jsx';
import update from 'immutability-helper';
import { displayError } from '../../helpers/errors.js';

import { insert } from '../../../api/posts/methods.js';

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
    this.onAddTask = this.onAddTask.bind(this);
    this.onRemoveTask = this.onRemoveTask.bind(this);
  }

  onPostCreate(event) {
    event.preventDefault();
    console.log(this.state.post);
    const { post } = this.state;
    let newPost = {
      type: post.type,
      text: post.text.value
    };

    if (post.type === 'event') {
      newPost.event = {
        location: post.event.location.value,
        time: post.event.time.valueAsDate
      }
    } else if (post.type == 'task') {
      newPost.task = {
        todos: post.task.todos.map(todo => ({
          _id: todo._id,
          text: todo.text.value
        }))
      }
    }

    console.log(newPost);
    insert.call({
      type: newPost.type,
      text: newPost.text,
      event: newPost.event ? newPost.event : null,
      task: newPost.task ? newPost.task : null
    }, displayError)
  }

  onCreateTask() {
    if (this.state.post.type === 'task') {
      return;
    }
    let { post } = this.state;

    post.type = 'task';
    post.event = null;
    post.task = {
      todos: [
        {_id: Random.id(), text: 'Enter a task'}
      ],
      assignees: [{}]
    };

    this.setState({
      post: post
    });
  }

  onAddTask() {
    if (this.state.post.type !== 'task') {
      return;
    }

    const { post } = this.state;
    post.task.todos.push({_id: Random.id(), text: ''});

    this.setState({
      post: post
    });
  }

  onRemoveTask(index) {
    if (this.state.post.type !== 'task') {
      return;
    }

    this.setState({
      post: update(this.state.post, {
        task: {todos: {$splice: [[index,1]]}}
      })
    });
  }

  onCreateEvent() {
    if (this.state.post.type === 'event') {
      return;
    }

    this.setState({
      post: update(this.state.post, {
        type: {$set: 'event'},
        task: {$set: null},
        event: {$set: {
          location: '',
          time: null
        }}
      })
    });
  }

  renderTasksBox() {
    const { post } = this.state;
    let items = post.task.todos.map((todo, index) => {
      return (
        <div key={todo._id} className="row">
          <div className="col-sm-10">
            <input type="text"
                   className="form-control"
                   ref={(c) => {todo.text = c}}
                   placeholder="Enter a task"/>
          </div>
          {index > 0
            ? <i className="icon-close col-sm-2"
                 onClick={() => this.onRemoveTask(index)}></i>
            : null}
        </div>
      );
    });
    return (
      <div className="post-task">
        {items}
        <button className="btn" type="button" onClick={this.onAddTask}>Add task</button>
      </div>
    )
  }

  renderEventBox() {
    const { post } = this.state;
    console.log(post);
    return (
      <div className="post-event">
        <input className="location form-control"
               type="text"
               ref={(c) => { post.event ? post.event.location = c : null}}/>
        <input className="date form-control"
               type="date"
               ref={(c) => { post.event ? post.event.time = c : null}}/>
      </div>
    )
  }

  render() {
    const { post } = this.state;

    return (
      <div className="post-box">
        <form className="post-create" onSubmit={this.onPostCreate}>
          <textarea
            name="text"
            className="text form-control"
            ref={(c) => {post.text = c}}>
          </textarea>
          {post.type === 'task' ?
            this.renderTasksBox() :
            post.type === 'event' ? this.renderEventBox() : ''}
          <div className="post-types row">
            <div className="col-sm-10">
              <button className="btn" type="button" onClick={this.onCreateTask}>
                Task
              </button>
              <button className="btn" type="button" onClick={this.onCreateEvent}>
                Event
              </button>
            </div>
            <div className="col-sm-2">
              <button className="btn submit" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}