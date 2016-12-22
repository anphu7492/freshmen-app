import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import { displayError } from '../../helpers/errors.js';

import { insert } from '../../../api/groups/methods.js';

export default class AddGroupPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      errors: {}
    });
    this.createGroup = this.createGroup.bind(this);
  }

  createGroup(event) {
    event.preventDefault();
    const groupName = this.newGroup;

    if (groupName.value.trim()) {
      console.log(insert.call);
      insert.call({
        name: groupName.value
      }, (err) => {
        if (err) {
          displayError(err);
        } else {
          toastr.success('Group has been added', 'Success');
          groupName.value = '';
        }
      });
    } else {
      this.setState({
        errors: {none: "Group name is required"}
      });
    }
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);

    return (
      <form className="group-new" onSubmit={this.createGroup}>
        <div className="list-errors">
          {errorMessages.map(msg => (
            <div className="list-item" key={msg}>{msg}</div>
          ))}
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            ref={(c) => { this.newGroup = c; }}
            placeholder="Enter group name"
          />

        <button type="submit" className="btn-primary">
          Add
        </button>
        </div>
      </form>
    )
  }
}
