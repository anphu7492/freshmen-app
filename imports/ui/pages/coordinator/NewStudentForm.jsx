import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import { displayError } from '../../helpers/errors.js';
import { createUserFromCoordinator} from '../../../api/users/methods.js';

export default class NewStudentForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {}, student: {}});
    this.createStudent = this.createStudent.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  handleGroupChange(event) {
    const student = this.state.student;
    student.group = event.target.value;
    this.setState({student: student});
  }

  handleRoleChange(event) {
    const student = this.state.student;
    student.role = event.target.value;
    this.setState({student: student});
  }

  createStudent() {
    const student = this.state.student;
    const email = student.email.value;
    const password = student.password.value;
    const confirm = student.confirm.value;
    const profile = {};
    profile.name = student.name.value;
    profile.school = student.school.value;
    profile.major = student.major.value;
    profile.facebook = "unset";
    profile.photo = "http://res.cloudinary.com/aalto/image/upload/v1482682730/yvwksnthiwobczxwfm5c.png";
    profile.twitter = "unset";
    profile.phone = "unset";
    const group = student.group;
    const role = student.role;
    const errors = {};

    if (!email) {
      errors.email = "Email required";
    }
    if (!password) {
      errors.password = "Password required";
    }
    if (confirm !== password) {
      errors.confirm = "Confirmed password doesn't match";
    }
    if (!role) {
      errors.role = "Role required";
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    console.log(email, password, profile, group, role);
    createUserFromCoordinator.call({
      email: email,
      password: password,
      profile: profile,
      group: group,
      role: role
    }, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitted) {
      this.createStudent();
    }
  }

  render() {
    const { groups } = this.props;
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const groupOptions = groups.map(group => (
      <option key={group._id} value={group._id}>{group.name}</option>
    ));
    console.log(errors, this.state);

    return (
      <Grid bsClass="student-form">
        <div className="list-errors">
          {errorMessages.map(msg => (
            <div className="list-item" key={msg}>{msg}</div>
          ))}
        </div>
        <Row>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('name')}`}>
              <input
                className="form-control"
                type="text"
                name="name"
                ref={(c) => { this.state.student.name = c; }}
                placeholder="Student Name"
              />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('email')}`}>
              <input
                className="form-control"
                type="email"
                name="email"
                ref={(c) => { this.state.student.email = c; }}
                placeholder="Student Email"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('school')}`}>
              <input
                className="form-control"
                type="text"
                name="school"
                ref={(c) => { this.state.student.school = c; }}
                placeholder="School"
              />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('major')}`}>
              <input
                className="form-control"
                type="text"
                name="major"
                ref={(c) => { this.state.student.major = c; }}
                placeholder="Major"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('group')}`}>
              <select className="form-control" value={this.state.student.group} onChange={this.handleGroupChange}>
                <option value="">Select group</option>
                {groupOptions}
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('role')}`}>
              {/*<input*/}
                {/*className="form-control"*/}
                {/*type="text"*/}
                {/*name="role"*/}
                {/*ref={(c) => { this.state.student.role = c; }}*/}
                {/*placeholder="Student Role"*/}
              {/*/>*/}
              <select className="form-control" value={this.state.student.role} onChange={this.handleRoleChange}>
                <option value="">Select role</option>
                <option value="tutor">Tutor</option>
                <option value="student">Student</option>
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('password')}`}>
              <input
                className="form-control"
                type="password"
                name="password"
                ref={(c) => { this.state.student.password = c; }}
                placeholder="Account Password"
              />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('confirm')}`}>
              <input
                className="form-control"
                type="password"
                name="confirm"
                ref={(c) => { this.state.student.confirm = c; }}
                placeholder="Confirm Account Password"
              />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

NewStudentForm.propTypes = {
  groups: React.PropTypes.array
};
