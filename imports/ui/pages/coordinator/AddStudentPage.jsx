import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import { Accounts } from 'meteor/accounts-base';

import NewStudentForm from './NewStudentForm.jsx';

export default class AddStudentPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      errors: {},
      newStudents: [{}],
      submitted: false
    });
    this.onSubmit = this.onSubmit.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      submitted: true
    });
  }

  addStudent() {
    this.setState({
      newStudent: this.state.newStudents.push({})
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';
    const { newStudents } = this.state;

    let StudentList = newStudents.map((student, index) => (
      <NewStudentForm
        key={index}
        submitted={this.state.submitted}
        student={student}
      />
    ));
    return (
      <div className="student-list">
        <form onSubmit={this.onSubmit}>
          {StudentList}
          <button type="button" className="btn-primary" onClick={this.addStudent}>
            Add
          </button>
          <button type="submit" className="btn-primary">
            Create
          </button>
        </form>
      </div>
    )
  }
}