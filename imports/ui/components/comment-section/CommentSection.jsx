import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import CommentBox from './CommentBox.jsx';
import Comment from './Comment.jsx';

export default class CommentSection extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {

    const comments = this.props.post.comments;
    let commentList;
    if (!comments || !comments.length) {
      commentList = '';
    } else {
      commentList = comments.map(comment => (
        <Comment key={comment._id}
                 comment={comment}
                 post={this.props.post}/>
      ));
    }

    return (
      <div className="comment-section">
        <CommentBox post={this.props.post}/>
        {commentList && (
          <div className="comment-list">
            {commentList}
          </div>
        )}
      </div>
    )
  }
}

CommentSection.propTypes = {
  post: React.PropTypes.object
};