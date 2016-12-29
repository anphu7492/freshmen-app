import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';

import NewStudentForm from './NewStudentForm.jsx';

export default class AddStudentPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      newStudents: [{_id: Random.id()}],
      submitted: false
    });
    this.onSubmit = this.onSubmit.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.errCallback = this.errCallback.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      submitted: true
    });
  }

  addStudent() {
    this.setState({
      newStudent: this.state.newStudents.push({_id: Random.id()})
    });
  }

  removeFromList(student) {
    let list;
    if (this.state.newStudents.length > 1) {
      list = this.state.newStudents.filter(st => (st._id !== student._id));
    } else {
      list = [{_id : Random.id()}]
    }

    this.setState({
      newStudents: list,
      submitted: false
    });
  }

  errCallback() {
    this.setState({
      submitted: false
    });
  }

  render() {
    const { groups } = this.props;
    const { newStudents } = this.state;

    let StudentList = newStudents.map((student, index) => (
      <NewStudentForm
        key={student._id}
        submitted={this.state.submitted}
        student={student}
        groups={groups}
        successCallback={this.removeFromList}
        errCallback={this.errCallback}
      />
    ));
    return (
      <div className="student-list">
        <form onSubmit={this.onSubmit}>
          {StudentList}
          <button type="button" className="btn btn-primary" onClick={this.addStudent}>
            Add
          </button>
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </form>
      </div>
    )
  }
}

AddStudentPage.propTypes = {
  groups: React.PropTypes.array
};
