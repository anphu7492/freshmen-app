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
      console.log(insert.call);
      insert.call({
        name: groupName.value
      }, function(err) {
        if (err) {
          displayError(err);
        } else {
          toastr.success('Success', 'Group has been added');
          groupName.value = '';
        }
      });
    }
  }

  render() {
    return (
      <form className="group-new" onSubmit={this.createGroup}>
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
