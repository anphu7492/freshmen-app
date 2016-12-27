import React from 'react';
import BaseComponent from '../BaseComponent.jsx';
import Post from '../post/Post';
import Message from '../Message';

export default class PostList extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts, loading } = this.props;

    let Posts;
    if (!posts || !posts.length) {
      Posts = (
        <Message
          title="No posts found"
          subtitle="Create a post now"
        />
      )
    } else {
      Posts = posts.map(post => (
        <Post
          key={post._id}
          post={post}
        />
      ));
    }
    return (
      <div className="post-list">
        <div className="post-items">
          {loading ? <Message title="Loading"/> : Posts}
        </div>
      </div>
    );
  }
}

PostList.propTypes = {
  posts: React.PropTypes.array,
  loading: React.PropTypes.bool
};