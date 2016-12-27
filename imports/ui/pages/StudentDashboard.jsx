import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Tasks from '../components/Tasks.jsx';
import Events from '../components/Events.jsx';
import { Groups } from '../../api/groups/groups.js';
import { Posts } from '../../api/posts/posts.js';
import PostList from '../components/post-list/PostList';
import PostCreate from '../components/post-create/PostCreate';
import Loading from '../components/Loading';

export default class StudentDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.users = Meteor.users.find().fetch();
    this.state.tasks = Posts.find({type: "task", creator: Meteor.userId()}).fetch();
    this.state.otherPosts = Posts.find({type: {$not: "task"}}).fetch();
    this.update = this.update.bind(this);
  }

  update(){
    this.setState({otherPosts: Posts.find({type: {$not: "task"}}).fetch()});
  }

  render() {
    const { posts, loading } = this.props;

    return (
      <div className="student-view">
          <PostCreate callBack={this.update}></PostCreate>
        {/*<Tasks />*/}

        {loading
          ? <Loading key="loading" />
          : <PostList posts={posts} loading={false}/>
        }
        {/*<Events/>*/}
      </div>
    );
  }
}

StudentDashboard.propTypes = {
  loading: React.PropTypes.bool,
  posts: React.PropTypes.array
};
