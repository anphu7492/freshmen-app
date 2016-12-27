import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import CommentSection from '../comment-section/CommentSection.jsx';
import { displayError } from '../../helpers/errors.js';
import { Modal, Button } from 'react-bootstrap';

import {
  remove
} from '../../../api/posts/methods.js';

export default class Post extends BaseComponent {
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
    remove.call({_id: this.props.post._id}, (err, res) => {
      if (err) {
        displayError(err);
      }

      toastr.success('Post has been removed', 'Success');
    });
  }

  render() {
    const { post } = this.props;
    //TODO: improve populating creator later
    //read more: collection-helpers and publishComposite
    const creator = Meteor.users.findOne(post.creator);

    return (
      <div className="post">
        <div className="post-header">
          <div className="avatar pull-left">
            <img className="img-responsive img-circle" src={creator.profile.photo}/>
          </div>
          <div className="user-info pull-left">
            {creator.profile.name}
          </div>

          { Meteor.userId() === post.creator
            ? <i className="icon-close pull-right" onClick={this.showDeleteModal}></i>
            : '' }

        </div>
        <div className="post-body">
          {this.props.post.text}
        </div>

        <div className="post-footer">
          <CommentSection post={this.props.post}/>
        </div>

        <Modal
          show={this.state.showDeleteModal}
          onHide={this.hideDeleteModal}>

          <Modal.Header closeButton>
            <Modal.Title>Delete post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
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

Post.propTypes = {
  post: React.PropTypes.object
};