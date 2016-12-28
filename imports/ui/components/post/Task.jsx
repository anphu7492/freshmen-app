import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';

export default class Task extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render(){
    const { post } = this.props;
    const todos = post.task.todos;
    let Todos = [];
    for (let i=0; i< todos.length; i++) {
      Todos.push(<li key={todos[i]._id}>{i+1}. {todos[i].text}.</li>);
    }

    return (
      <div className="Task">
        <ul className="todo-list">
          {Todos}
        </ul>
        <button className="custom-btn-success">Mark as complete</button>
      </div>
    );
  }
}
