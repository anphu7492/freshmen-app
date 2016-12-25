import React from 'react';
import { Random } from 'meteor/random';
import BaseComponent from '../BaseComponent.jsx';
import update from 'immutability-helper';

import {
  insert
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
    console.log(newPost);
    insert.call({
      type: newPost.type,
      text: newPost.text
    })
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
        {id: Random.id(), text: 'Enter a task'}
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
    post.task.todos.push({id: Random.id(), text: ''});

    this.setState({
      post: post
    });
  }

  onRemoveTask(index) {
    console.log(index);
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
    const {post} = this.state;

    /*post.type = 'event';
    post.task = null;
    post.event = {
      location: '',
      time: null
    };*/

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
        <div key={todo.id} className="row">
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
               type="text"
               ref={(c) => { post.event ? post.event.time = c : null}}/>
      </div>
    )
  }

  render() {
    const { post } = this.state;
    console.log(post);

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