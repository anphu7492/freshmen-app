import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import { displayError } from '../../helpers/errors.js';

import { insert } from '../../../api/groups/methods.js';

export default class AddGroupPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {

    });
    this.createGroup = this.createGroup.bind(this);
  }

  createGroup(event) {
    event.preventDefault();
    const groupName = this.newGroup;

    if (groupName.value.trim()) {
      insert.call({
        name: groupName.value
      }, displayError);
    }
  }

  render() {
    return (
      <form className="group-new input-symbol" onSubmit={this.createGroup}>
        <input
          className="form-control"
          type="text"
          ref={(c) => { this.newGroup = c; }}
          placeholder="Enter group name"
        />
        <button type="submit" className="btn-primary">
          Add
        </button>
      </form>
    )
  }
}