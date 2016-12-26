import React from 'react';
import BaseComponent from '../../components/BaseComponent.jsx';
import CommentBox from './CommentBox.jsx';

export default class CommentSection extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="comment-section">
        <CommentBox post={this.props.post}/>
      </div>
    )
  }
}

CommentSection.propTypes = {
  post: React.PropTypes.object
};