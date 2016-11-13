import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import { displayError } from '../../helpers/errors.js';
import { createUserFromCoordinator} from '../../../api/users/methods.js';

export default class NewStudentForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {}});
  }

  createStudent() {
    const student = this.props.student;
    const email = student.email.value;
    const password = student.password.value;
    const confirm = student.confirm.value;
    const profile = {};
    profile.name = student.name.value;
    profile.school = student.school.value;
    profile.major = student.major.value;
    const group = student.group.value;
    const role = student.role.value;
    const errors = {};

    if (!email) {
      errors.email = i18n.__('pages.authPageJoin.emailRequired');
    }
    if (!password) {
      errors.password = i18n.__('pages.authPageJoin.passwordRequired');
    }
    if (confirm !== password) {
      errors.confirm = i18n.__('pages.authPageJoin.passwordConfirm');
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    createUserFromCoordinator.call({
      email: email,
      password: password,
      profile: profile,
      group: group,
      role: role
    }, (err) => {
      if (err) {
        console.log('err', err);
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
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';
    console.log(errors, this.props);

    return (
      <Grid bsClass="student">
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
                ref={(c) => { this.props.student.name = c; }}
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
                ref={(c) => { this.props.student.email = c; }}
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
                ref={(c) => { this.props.student.school = c; }}
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
                ref={(c) => { this.props.student.major = c; }}
                placeholder="Major"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('group')}`}>
              <input
                className="form-control"
                type="text"
                name="group"
                ref={(c) => { this.props.student.group = c; }}
                placeholder="Student Group"
              />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className={`input-field ${errorClass('role')}`}>
              <input
                className="form-control"
                type="text"
                name="role"
                ref={(c) => { this.props.student.role = c; }}
                placeholder="Student Role"
              />
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
                ref={(c) => { this.props.student.password = c; }}
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
                ref={(c) => { this.props.student.confirm = c; }}
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
  student: React.PropTypes.object
};