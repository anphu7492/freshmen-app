import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import { displayError } from '../../helpers/errors.js';
import {
  markEventConfirmation
} from '../../../api/posts/methods.js';
import Locator from '../Locator.jsx';
import { Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

export default class Event extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      showInfoModal: false,
      peopleGoing: [],
      peopleMaybe: [],
      peopleNotGoing: []
    });
    this.markEventAs = this.markEventAs.bind(this);
    this.showInfoModal = this.showInfoModal.bind(this);
    this.hideInfoModal = this.hideInfoModal.bind(this);

  }

  showInfoModal(event) {
    this.setState({showInfoModal: true});
    let peopleGoing=[];
    let peopleNotGoing=[];
    let peopleMaybe=[];
    for (var i=0;i < event.confirmations.length; i++){
      if (event.confirmations[i].status ==="going"){
        let user = Meteor.users.findOne(event.confirmations[i].user);
        peopleGoing.push(
          <OverlayTrigger placement="top" key={user._id} overlay={<Tooltip id="tooltip">{user.profile.name}</Tooltip>}>
            <a href={"/profile/" + user._id}><img className="event-attendee-pic" src={user.profile.photo} /></a>
          </OverlayTrigger>
        );
      }
      else if (event.confirmations[i].status ==="maybe"){
        let user = Meteor.users.findOne(event.confirmations[i].user);
        peopleMaybe.push(
          <OverlayTrigger key={user._id} placement="top" overlay={<Tooltip id="tooltip">{user.profile.name}</Tooltip>}>
            <a href={"/profile/" + user._id}><img className="event-attendee-pic" src={user.profile.photo} /></a>
          </OverlayTrigger>
        );
      }
      else {
        let user = Meteor.users.findOne(event.confirmations[i].user);
        peopleNotGoing.push(
          <OverlayTrigger key={user._id} placement="top" overlay={<Tooltip id="tooltip">{user.profile.name}</Tooltip>}>
            <a href={"/profile/" + user._id}><img className="event-attendee-pic" src={user.profile.photo} /></a>
          </OverlayTrigger>
        );
      }
    }
    this.setState({
      peopleGoing: peopleGoing,
      peopleNotGoing: peopleNotGoing,
      peopleMaybe: peopleMaybe
    });

  }

  hideInfoModal() {
    this.setState({showInfoModal: false});
  }

  markEventAs(confirmation) {
    markEventConfirmation.call({
      postId: this.props.post._id,
      confirmation: confirmation
    }, (err) => {
      if (err) {
        displayError(err);
      } else {
        toastr.success('Action has been confirmed', 'Success');
      }
    });
  }

  render() {
    const { post } = this.props;
    const event = post.event;
    const stats = {
      going: event.confirmations.filter(conf => (conf.status === 'going')),
      notGoing: event.confirmations.filter(conf => (conf.status === 'notGoing')),
      maybe: event.confirmations.filter(conf => (conf.status === 'maybe')),
    };

    const myStatus = event.confirmations.find(conf => (conf.user === Meteor.userId())) || {};

    return (
      <div className="event-details">
        <hr/>
        <div className="layout">
          <div className="map flex">
            <Locator address={event.location}/>
          </div>
          <div className="info flex-none">
            <p className="location">
              <i className="glyphicon glyphicon-map-marker"></i>
              {event.location.address}
            </p>
            <p className="date">
              <i className="glyphicon glyphicon-time"></i>
              {event.time.toLocaleString()}
            </p>

            <div className="stats">
              <div>{stats.going.length} Going</div>
              <div>{stats.maybe.length} Interested</div>
              <div>{stats.notGoing.length} Not going</div>
              <button onClick={() => this.showInfoModal(event)} className="btn event-info"><span className="glyphicon glyphicon-info-sign"></span>More info</button>
            </div>
            <p>Mark myself as:</p>
            <div className="btn-group">
              <button type="button"
                      disabled={myStatus.status === 'going'}
                      className={`btn btn-success ${myStatus.status === 'going' ? 'checked' : ''}`}
                      onClick={() => this.markEventAs('going')}>
                {myStatus.status === 'going' ? <i className="glyphicon glyphicon-ok"></i> : ''}
                Going
              </button>
              <button type="button"
                      disabled={myStatus.status === 'maybe'}
                      className={`btn btn-info ${myStatus.status === 'maybe' ? 'checked' : ''}`}
                      onClick={() => this.markEventAs('maybe')}>
                {myStatus.status === 'maybe' ? <i className="glyphicon glyphicon-ok"></i> : ''}
                Maybe
              </button>
              <button type="button"
                      disabled={myStatus.status === 'notGoing'}
                      className={`btn btn-danger ${myStatus.status === 'notGoing' ? 'checked' : ''}`}
                      onClick={() => this.markEventAs('notGoing')}>
                {myStatus.status === 'notGoing' ? <i className="glyphicon glyphicon-ok"></i> : ''}
                Not going
              </button>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.showInfoModal}
          onHide={this.hideInfoModal}>

          <Modal.Header closeButton>
            <Modal.Title>Attendee confirmations for {post.text}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div id="event-attendees">
              <p>Going: {stats.going.length}</p>
              {this.state.peopleGoing}
              <p>Maybe: {stats.maybe.length}</p>
              {this.state.peopleMaybe}
              <p>Not going: {stats.notGoing.length}</p>
              {this.state.peopleNotGoing}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hideInfoModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Event.propTypes = {
  post: React.PropTypes.object
};
