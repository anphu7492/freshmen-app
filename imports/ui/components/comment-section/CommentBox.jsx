import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import { displayError } from '../../helpers/errors.js';

import {
  addComment
} from '../../../api/posts/methods.js';

export default class CommentBox extends BaseComponent {
  constructor(props) {
    super(props);
    this.createComment = this.createComment.bind(this);
  }

  createComment(event) {
    event.preventDefault();
    console.log(this.commentContent.value);
    const content = this.commentContent.value.trim();
    if (content) {
      addComment.call({
        content: content,
        postId: this.props.post._id
      }, displayError);

      this.commentContent.value = '';
    }
  }
  render() {

    const user = Meteor.user();
    return (
      <div className="comment-box layout">
        <div className="avatar flex-none">
          <img className="user-avatar square xs" src={user.profile.photo}/>
        </div>
        <div className="input-box flex">
          <form onSubmit={this.createComment}>
            <input
              className="form-control"
              placeholder="Write a comment"
              ref={(c) => { this.commentContent = c; }}></input>
          </form>
        </div>
      </div>
    )
  }
}

CommentBox.propTypes = {
  post: React.PropTypes.object
};