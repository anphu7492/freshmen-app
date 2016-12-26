import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../BaseComponent.jsx';
import Comments from '../../components/Comments.jsx';

import { Posts } from '../../../api/posts/posts';

export default class Post extends BaseComponent {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { post } = this.props;

    return (
      <div className="post">
        <div className="post-header">
          <div className="avatar">
            {/*<img src={this.props.post.creator.profile.photo}/>*/}
          </div>
          <div className="user-info">

          </div>
        </div>
        <div className="post-body">
          {this.props.post.text}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: React.PropTypes.object
};