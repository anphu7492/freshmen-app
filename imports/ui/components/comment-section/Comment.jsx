import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import { displayError } from '../../helpers/errors.js';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
  removeComment
} from '../../../api/posts/methods.js';

export default class Comment extends BaseComponent {
  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  showDeleteModal() {
    this.setState({showDeleteModal: true});
  }

  hideDeleteModal() {
    this.setState({showDeleteModal: false});
  }

  deleteComment() {
    removeComment.call({
      _id: this.props.comment._id,
      postId: this.props.post._id
    }, (err, res) => {
      if (err) {
        displayError(err);
      }

      toastr.success('Comment has been removed', 'Success');
    });
  }

  render() {
    const { comment } = this.props;
    const creator = Meteor.users.findOne(comment.creator);
    const creatorProfile = "/profile/" + creator._id;
    const deleteCommentBtn = (
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Delete</Tooltip>}>
        <i className="icon-trash delete-btn" onClick={this.showDeleteModal}></i>
      </OverlayTrigger>
    );

    return (
      <div className="comment layout">
        <div className="avatar flex-none">
          <a href={creatorProfile}><img className="user-avatar square xs"
               src={creator.profile.photo}/></a>
        </div>
        <div className="comment-content flex layout-align--middle">
          <a className="commenter" href={creatorProfile}>{creator.profile.name}:</a>
          <span className="comment-text">{comment.content}</span>
        </div>

        { Meteor.userId() === comment.creator
          ? deleteCommentBtn
          : '' }

        <Modal
          show={this.state.showDeleteModal}
          onHide={this.hideDeleteModal}>

          <Modal.Header closeButton>
            <Modal.Title>Delete comment</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hideDeleteModal}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deleteComment}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: React.PropTypes.object,
  post: React.PropTypes.object
};
