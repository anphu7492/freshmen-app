import React from 'react';
import { Meteor } from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import PostCreate from '../components/post-create/PostCreate';
import { Posts } from '../../api/posts/posts.js';
import PostList from '../components/post-list/PostList';
import Loading from '../components/Loading';

export default class TutorDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.users = Meteor.users.find().fetch();

    this.state.tasks = Posts.find({type: "task", creator: Meteor.userId()}).fetch();
    this.state.otherPosts = Posts.find({type: {$not: "task"}}).fetch();
    this.update = this.update.bind(this);
  }

  update(){
    this.setState({
      otherPosts: Posts.find({type: {$not: "task"}}).fetch()
    });
  }

  render() {
    const { posts, loading } = this.props;

    return (
      <div className="tutor-dashboard">
        <div className ="tutor-main layout--column">
          <div className="flex-none">
            <PostCreate callBack={this.update}></PostCreate>
          </div>
          <div className="flex">
            {loading
              ? <Loading key="loading" />
              : <PostList posts={posts} loading={false}/>
            }
          </div>

        </div>
      </div>
    );
  }
}

TutorDashboard.propTypes = {
  loading: React.PropTypes.bool,
  posts: React.PropTypes.array
};
