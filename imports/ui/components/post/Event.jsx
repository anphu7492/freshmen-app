import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import CommentSection from '../comment-section/CommentSection.jsx';
import { displayError } from '../../helpers/errors.js';
import { Modal, Button } from 'react-bootstrap';
import {
  remove
} from '../../../api/posts/methods.js';
import Locator from '../Locator.jsx';

export default class Event extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      showDeleteModal: false
    });
    this.deletePost = this.deletePost.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  showDeleteModal() {
    this.setState({showDeleteModal: true});
  }

  hideDeleteModal() {
    this.setState({showDeleteModal: false});
  }
  deletePost() {
    remove.call({_id: this.props.event._id}, (err, res) => {
      if (err) {
        displayError(err);
      }

      toastr.success('Event has been removed', 'Success');
    });
  }

  render() {
    const { event } = this.props;
    //TODO: improve populating creator later
    //read more: collection-helpers and publishComposite
    const creator = Meteor.users.findOne(event.creator);
    const createdAt = new Date(event.createdAt);
    const eventDate = new Date(event.event.time);
    const creatorProfile = "/profile/" + creator._id;
console.log(event.event.location);

    return (
      <div className="events">
        <div className="event-header">
          <div className="avatar">
            <a href={creatorProfile}><img className="img-responsive img-circle" src={creator.profile.photo}/></a>
          </div>
          <div className="user-info">
            <a href={creatorProfile}>{creator.profile.name}</a><span id="eventTag"> created an event</span>
            <p id="date"> on {createdAt.toUTCString()}</p>
          </div>

        { Meteor.userId() === event.creator
            ? <i className="icon-close pull-right" onClick={this.showDeleteModal}></i>
            : '' }

        </div>

        <div className="event-body">
          {this.props.event.text} on <span id="eventDate">{eventDate.toLocaleString()}</span>
        </div>
        <hr></hr>
          <div className="mapDiv">
              <Locator address={event.event.location}/>
            </div>
        <hr></hr>
        <div className="event-footer">
          <CommentSection post={this.props.event}/>
        </div>

        <Modal
          show={this.state.showDeleteModal}
          onHide={this.hideDeleteModal}>

          <Modal.Header closeButton>
            <Modal.Title>Delete event</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete this event? This action cannot be undone.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hideDeleteModal}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deletePost}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );


  }
}

Event.propTypes = {
  event: React.PropTypes.object
};
