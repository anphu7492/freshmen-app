import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import BaseComponent from '../components/BaseComponent.jsx';
import Tasks from '../components/Tasks.jsx';
import Events from '../components/Events.jsx';
import Posty from '../components/Posts.jsx';
import { Groups } from '../../api/groups/groups.js';
import { Posts } from '../../api/posts/posts.js';

export default class StudentDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.users = Meteor.users.find().fetch();
    const id = Meteor.userId();
    this.state.tasks = Posts.find({type: "task", creator: Meteor.userId()}).fetch();
    this.state.otherPosts = Posts.find({type: {$not: "task"}}).fetch();
    this.update = this.update.bind(this);
  }

  update(){
    this.setState({otherPosts: Posts.find({type: {$not: "task"}}).fetch()});
  }

      render() {
        const user = this.props;
        console.log(this.state.otherPosts);
        var postsToDisplay = [];
        for (var i = 0;  i < this.state.otherPosts.length ; i++ )
        {
          postsToDisplay.push(<Posty key={i} post={this.state.otherPosts[i]} users={this.state.users} />);
        }


        return (
            <div className="student-view">
              <div>
              <form className="posForm">
                <h4>Create a post</h4>
                <div className="form-group">
                  <input type="text" className="form-control input-lg" id="post" placeholder="What's up?" />
                </div>
                <button type="submit" className="btn btn-success">Post</button>
              </form>
              </div>
              <Tasks />
              {postsToDisplay}
              <Events/>
            </div>
         );
      }
}
